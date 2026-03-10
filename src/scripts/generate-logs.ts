import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { fromMarkdown } from 'mdast-util-from-markdown';
import type { Node, Parent } from 'mdast';
import { createHash } from 'node:crypto';
import { exec } from 'node:child_process';

const READ_FOLDER_PATH = '../routes/dev-logs';
const WRITE_FOLDER_PATH = '../routes/converted-logs';
const CACHE_FOLDER_PATH = '../../.cache';
const MANIFEST_FILE = 'manifest.json';

interface FileDetails {
    title: string;
    date: Date;
    description: string;
    topics: string[];
}

interface ConvertedLog {
    fileDetails: FileDetails;
    component: string;
    writeFile: string;
    componentStructure: string[];
}

function getCurrentFolderPath(): string {
    const __fileName = fileURLToPath(import.meta.url);
    return dirname(__fileName);
}

function createFolderPath(folderPath: string): string {
    return path.join(getCurrentFolderPath(), folderPath);
}

function getOldFileHashes(cacheFolderPath: string): Map<string, string> {
    const file = path.join(cacheFolderPath, MANIFEST_FILE);
    if (!existsSync(file)) {
        return new Map();
    }

    const content = readFileSync(file, 'utf-8');
    return new Map(Object.entries(JSON.parse(content)));
}

function hashFiles(folder: string): Map<string, string> {
    const fileHashes = new Map<string, string>();
    const files = readdirSync(folder);

    for (const file of files) {
        const filePath = path.join(folder, file);
        const fileContent = readFileSync(filePath);
        const hash = createHash('sha256').update(fileContent).digest('hex');

        fileHashes.set(file, hash);
    }

    return fileHashes;
}

function compareHashFiles(oldHashes: Map<string, string>, newHashes: Map<string, string>) {
    const deletedFiles = [];
    const unchangedFiles = [];
    const modifiedFiles = [];
    const newFiles = [];

    for (const [key, _] of oldHashes) {
        if (!newHashes.has(key)) {
            deletedFiles.push(key);
        }
    }

    for (const [key, value] of newHashes) {
        if (!oldHashes.has(key)) {
            newFiles.push(key);
        } else {
            const oldHash = oldHashes.get(key)!;
            if (oldHash === value) {
                unchangedFiles.push(key);
            } else {
                modifiedFiles.push(key);
            }
        }
    }

    return {
        deletedFiles,
        unchangedFiles,
        modifiedFiles,
        newFiles,
    };
}

function getFileStates(cacheFolderPath: string, readFolderPath: string) {
    const oldFileHashes = getOldFileHashes(cacheFolderPath);
    const newfileHashes = hashFiles(readFolderPath);
    const res = compareHashFiles(oldFileHashes, newfileHashes);
    console.info(res);

    return {
        files: res,
        hashes: newfileHashes,
    };
}

function deleteUnusedFiles(writeFolderPath: string, fileNames: string[]) {
    for (const file of fileNames) {
        const componentName = createComponentFileName(file);
        const filepath = path.join(writeFolderPath, componentName);

        if (!existsSync(filepath)) {
            continue;
        }

        unlinkSync(filepath);
    }
}

function createConvertedLogObject(readFolderPath: string, fileName: string): ConvertedLog {
    const filePath = path.join(readFolderPath, fileName);
    const fileData = matter.read(filePath);
    const fileMetaData = frontMatterToFileDetails(fileData.data);

    const componentStructure = parseTree(fromMarkdown(fileData.content));
    const componentFileName = createComponentFileName(fileName);
    const componentName = createComponentName(fileMetaData.title);
    return {
        fileDetails: fileMetaData,
        component: componentName,
        writeFile: componentFileName,
        componentStructure: componentStructure,
    };
}

function createNewLogs(readFolderPath: string, writeFolderPath: string, fileNames: string[]): ConvertedLog[] {
    const convertedLogs: ConvertedLog[] = [];

    for (const file of fileNames) {
        const log = createConvertedLogObject(readFolderPath, file);
        const logFileComponent = createComponent(log);
        writeFileSync(path.join(writeFolderPath, log.writeFile), logFileComponent);
        convertedLogs.push(log);
    }

    return convertedLogs;
}

function getOldLogs(readFolderPath: string, fileNames: string[]): ConvertedLog[] {
    const convertedLogs: ConvertedLog[] = [];

    for (const file of fileNames) {
        const filePath = path.join(readFolderPath, file);
        const fileData = matter.read(filePath);
        const fileMetaData = frontMatterToFileDetails(fileData.data);
        const componentFileName = createComponentFileName(file);
        const componentName = createComponentName(fileMetaData.title);

        convertedLogs.push({
            fileDetails: fileMetaData,
            component: componentName,
            writeFile: componentFileName,
            componentStructure: [],
        });
    }

    return convertedLogs;
}

function createLogsIndex(logs: ConvertedLog[]): string {
    logs.sort((a, b) => a.fileDetails.date.getTime() - b.fileDetails.date.getTime());

    const imports = logs
        .map((log) => `import ${log.component} from './${log.writeFile.replace('.tsx', '')}';`)
        .join('\n');

    const entries = logs
        .map((log) => {
            const dateStr = log.fileDetails.date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
            return `    {
        title: '${log.fileDetails.title}',
        date: '${dateStr}',
        route: '${log.writeFile.replace('.tsx', '')}',
        component: ${log.component},
        topics: [${log.fileDetails.topics.map((t) => `'${t}'`).join(', ')}],
    }`;
        })
        .join(',\n');

    return `import { LogCardProps } from '../../components/log/log-card';

${imports}

interface Log extends LogCardProps {
    component: () => JSX.Element;
}

const logs: Log[] = [
${entries}
];

export default logs;
`;
}

function createComponent(log: ConvertedLog): string {
    return `export default function ${log.component}() {
    return (
        <h1>test</h1>
    );
}`;
}

function frontMatterToFileDetails(frontMatter: { [key: string]: any }): FileDetails {
    if (!frontMatter.title || !frontMatter.date || !frontMatter.description || !frontMatter.topics) {
        throw new Error(
            `Expected frontMatter to contain title, date, topics and description; Got ${JSON.stringify(frontMatter, null, 4)}`,
        );
    }

    if (frontMatter.title.length > 25) {
        throw new Error(`Title must be less than or equal to 25 characters; Got ${frontMatter.title.length}`);
    }

    return {
        title: frontMatter.title,
        date: new Date(frontMatter.date),
        description: frontMatter.description,
        topics: frontMatter.topics.map((val: string) => {
            const cleaned = val.trim();
            return cleaned[0].toUpperCase() + cleaned.slice(1);
        }),
    };
}

function createComponentFileName(mdFileName: string): string {
    const split = mdFileName.slice(0, -3).split('-');

    for (let i = 0; i < split.length; i++) {
        split[i] = split[i].toLowerCase();
    }

    return split.join('-') + '.tsx';
}

function createComponentName(title: string): string {
    const splitTitle = title.split(' ');

    for (let i = 0; i < splitTitle.length; i++) {
        splitTitle[i] = splitTitle[i][0].toUpperCase() + splitTitle[i].slice(1).toLowerCase();
    }

    return splitTitle.join('');
}

function parseNode(node: Node): string {
    return 'test';
}

function parseTree(node: Parent): string[] {
    return node.children.map((val) => parseNode(val));
}

async function main(): Promise<number> {
    const readFolderPath = createFolderPath(READ_FOLDER_PATH);
    const writeFolderPath = createFolderPath(WRITE_FOLDER_PATH);
    const cacheFolderPath = createFolderPath(CACHE_FOLDER_PATH);

    const fileStates = getFileStates(cacheFolderPath, readFolderPath);
    deleteUnusedFiles(writeFolderPath, fileStates.files.deletedFiles);

    const oldLogs = getOldLogs(readFolderPath, [...fileStates.files.unchangedFiles]);
    const createdLogs = createNewLogs(readFolderPath, writeFolderPath, [
        ...fileStates.files.modifiedFiles,
        ...fileStates.files.newFiles,
    ]);

    const logFileContent = createLogsIndex([...oldLogs, ...createdLogs]);
    writeFileSync(path.join(writeFolderPath, 'logs.ts'), logFileContent);

    writeFileSync(
        path.join(cacheFolderPath, MANIFEST_FILE),
        JSON.stringify(Object.fromEntries(fileStates.hashes.entries())),
    );

    exec('npm run format');

    return createdLogs.length;
}

main()
    .then((generatedFileCount) => console.log(`Generated ${generatedFileCount} files`))
    .catch((error) => console.log(error));
