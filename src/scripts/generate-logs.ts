import { readdirSync } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { fromMarkdown } from 'mdast-util-from-markdown';

interface FileDetails {
    title: string;
    date: Date;
    description: string;
}

function frontMatterToFileDetails(frontMatter: { [key: string]: any }): FileDetails {
    if (!frontMatter.title || !frontMatter.date || !frontMatter.description) {
        throw new Error(
            `Expected frontMatter to contain title, date, and description; Got ${JSON.stringify(frontMatter, null, 4)}`,
        );
    }

    return {
        title: frontMatter.title,
        date: new Date(frontMatter.date),
        description: frontMatter.description,
    };
}

async function main(): Promise<number> {
    const __fileName = fileURLToPath(import.meta.url);
    const __dirName = dirname(__fileName);
    const folderPath = path.join(__dirName, '../routes/dev-logs');

    let count = 0;

    const files = readdirSync(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileData = matter.read(filePath);
        const fileMetaData = frontMatterToFileDetails(fileData.data);
        const tree = fromMarkdown(fileData.content);

        console.log(fileMetaData);
        console.log(tree);
    }

    return count;
}

main()
    .then((numberProcessed) => console.log(`Finished processing ${numberProcessed} docs`))
    .catch((error) => console.log(error));
