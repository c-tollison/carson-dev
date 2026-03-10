import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { fromMarkdown } from 'mdast-util-from-markdown';
import type { Node, Parent } from 'mdast';
import { createHash } from 'node:crypto';
import { get } from 'node:http';
import { FILE } from 'node:dns';

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
}

function getCurrentFolderPath(): string {
    const __fileName = fileURLToPath(import.meta.url);
    return dirname(__fileName);
}

function generateFolderPath(folderPath: string): string {
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
    return res;
}

function generateLogsFile(logs: ConvertedLog[]): string {
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

function generateComponent(log: ConvertedLog): string {
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
        topics: frontMatter.topics.split(',').map((val: string) => {
            const cleaned = val.trim();
            return cleaned[0].toUpperCase() + cleaned.slice(1);
        }),
    };
}

function createFileName(title: string): string {
    const splitTitle = title.split(' ');

    for (let i = 0; i < splitTitle.length; i++) {
        splitTitle[i] = splitTitle[i].toLowerCase();
    }

    return splitTitle.join('-') + '.tsx';
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

async function main(): Promise<string[]> {
    const readFolderPath = generateFolderPath(READ_FOLDER_PATH);
    const writeFolderPath = generateFolderPath(WRITE_FOLDER_PATH);
    const cacheFolderPath = generateFolderPath(CACHE_FOLDER_PATH);
    const processedFiles: string[] = [];

    const fileStates = getFileStates(cacheFolderPath, readFolderPath);

    // const convertedLogs: ConvertedLog[] = [];

    // for (const file of files) {
    //     const filePath = path.join(readFolderPath, file);
    //     const fileData = matter.read(filePath);

    //     const fileMetaData = frontMatterToFileDetails(fileData.data);
    //     const componentStructure = parseTree(fromMarkdown(fileData.content));

    //     const writeFile = createFileName(fileMetaData.title);
    //     const componentName = createComponentName(fileMetaData.title);

    //     convertedLogs.push({
    //         fileDetails: fileMetaData,
    //         component: componentName,
    //         writeFile: writeFile,
    //     });
    // }

    // convertedLogs.sort((a, b) => a.fileDetails.date.getTime() - b.fileDetails.date.getTime());

    // for (const log of convertedLogs) {
    //     const logFileComponent = generateComponent(log);
    //     writeFileSync(path.join(writeFolderPath, log.writeFile), logFileComponent);
    // }

    // const logFileContent = generateLogsFile(convertedLogs);
    // writeFileSync(path.join(writeFolderPath, 'logs.ts'), logFileContent);

    return processedFiles;
}

main().catch((error) => console.log(error));
