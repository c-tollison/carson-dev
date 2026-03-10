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
    const body = log.componentStructure.join('\n            ');

    return `import LogPage from '../../components/log/log-page';
import CodeBlock from '../../components/log/code-block';

export default function ${log.component}() {
    return (
        <LogPage
            title="${log.fileDetails.title}"
            date="${log.fileDetails.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}"
            topics={[${log.fileDetails.topics.map((t) => `'${t}'`).join(', ')}]}
        >
            ${body}
        </LogPage>
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

const HEADING_STYLES: Record<number, string> = {
    1: 'text-2xl font-bold text-primary',
    2: 'text-xl font-bold text-foreground',
    3: 'text-lg font-semibold text-foreground',
    4: 'text-base font-semibold text-foreground',
    5: 'text-sm font-semibold text-foreground',
    6: 'text-sm font-medium text-muted-foreground',
};

function escapeJsx(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;');
}

function parseNode(node: Node): string {
    switch (node.type) {
        case 'heading': {
            const heading = node as Parent & { depth: number };
            const tag = `h${heading.depth}`;
            const styles = HEADING_STYLES[heading.depth] ?? HEADING_STYLES[6];
            const children = heading.children.map(parseNode).join('');
            return `<${tag} className="${styles}">${children}</${tag}>`;
        }
        case 'paragraph': {
            const paragraph = node as Parent;
            const children = paragraph.children.map(parseNode).join('');
            return `<p className="text-foreground leading-relaxed">${children}</p>`;
        }
        case 'text': {
            return escapeJsx((node as any).value);
        }
        case 'strong': {
            const children = (node as Parent).children.map(parseNode).join('');
            return `<strong className="font-semibold text-foreground">${children}</strong>`;
        }
        case 'emphasis': {
            const children = (node as Parent).children.map(parseNode).join('');
            return `<em className="italic text-muted-foreground">${children}</em>`;
        }
        case 'code': {
            const code = node as any;
            const lang = code.lang ?? '';
            const escaped = code.value.replace(/`/g, '\\`').replace(/\$/g, '\\$');
            return `<CodeBlock code={\`${escaped}\`} language="${lang}" />`;
        }
        case 'inlineCode': {
            const escaped = escapeJsx((node as any).value);
            return `<code className="bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground">${escaped}</code>`;
        }
        case 'link': {
            const link = node as Parent & { url: string };
            const children = link.children.map(parseNode).join('');
            return `<a href="${link.url}" className="text-primary hover:underline transition-colors" target="_blank" rel="noopener noreferrer">${children}</a>`;
        }
        case 'list': {
            const list = node as Parent & { ordered: boolean };
            if (list.ordered) {
                const children = list.children.map(parseNode).join('\n');
                return `<ol className="list-decimal ml-5 space-y-2 text-foreground">\n${children}\n</ol>`;
            }
            const children = list.children.map(parseNode).join('\n');
            return `<ul className="list-disc ml-5 space-y-2 text-foreground">\n${children}\n</ul>`;
        }
        case 'listItem': {
            const children = (node as Parent).children.map(parseNode).join('');
            return `<li className="leading-relaxed">${children}</li>`;
        }
        case 'blockquote': {
            const children = (node as Parent).children.map(parseNode).join('\n');
            return `<blockquote className="border-l-4 border-primary pl-4 py-2 italic text-muted-foreground">${children}</blockquote>`;
        }
        case 'thematicBreak': {
            return `<hr className="border-border my-2" />`;
        }
        case 'break': {
            return `<br />`;
        }
        case 'image': {
            const img = node as any;
            const alt = img.alt ? ` alt="${escapeJsx(img.alt)}"` : '';
            return `<img src="${img.url}"${alt} className="rounded-lg border border-border max-w-full" />`;
        }
        default:
            console.warn(`Unhandled node type: ${node.type}: ${node.data}`);
            return '';
    }
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
