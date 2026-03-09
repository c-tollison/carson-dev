import { readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { fromMarkdown } from 'mdast-util-from-markdown';
import type { Node, Parent } from 'mdast';

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
    // componentStructure
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

async function main(): Promise<number> {
    const __fileName = fileURLToPath(import.meta.url);
    const __dirName = dirname(__fileName);
    const folderPath = path.join(__dirName, '../routes/dev-logs');
    const writeFolderPath = path.join(__dirName, '../routes/converted-logs');

    let count = 0;

    const files = readdirSync(folderPath);
    const oldConvertedFiles = readdirSync(writeFolderPath);
    const convertedLogs: ConvertedLog[] = [];

    for (const file of oldConvertedFiles) {
        unlinkSync(path.join(writeFolderPath, file));
    }

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileData = matter.read(filePath);

        const fileMetaData = frontMatterToFileDetails(fileData.data);
        const componentStructure = parseTree(fromMarkdown(fileData.content));

        const writeFile = createFileName(fileMetaData.title);
        const componentName = createComponentName(fileMetaData.title);

        convertedLogs.push({
            fileDetails: fileMetaData,
            component: componentName,
            writeFile: writeFile,
        });
    }

    convertedLogs.sort((a, b) => a.fileDetails.date.getTime() - b.fileDetails.date.getTime());

    for (const log of convertedLogs) {
        const logFileComponent = generateComponent(log);
        writeFileSync(path.join(writeFolderPath, log.writeFile), logFileComponent);
        count++;
    }

    const logFileContent = generateLogsFile(convertedLogs);
    writeFileSync(path.join(writeFolderPath, 'logs.ts'), logFileContent);

    return count;
}

main()
    .then((numberProcessed) => console.log(`Finished processing ${numberProcessed} docs`))
    .catch((error) => console.log(error));
