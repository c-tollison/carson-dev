import LogPage from '../../components/log/log-page';
import CodeBlock from '../../components/log/code-block';

export default function MarkdownToBlogPosts() {
    return (
        <LogPage
            title='Markdown to Blog Posts'
            date='Mar 9, 2026'
            topics={['AST', 'Markdown', 'Tooling']}
        >
            <p className='text-foreground leading-relaxed'>
                Writing for this site used to involve too much ceremony. Every new post meant manually creating
                components, copying boilerplate, and updating routes. It wasn't difficult, but the friction was enough
                to let ideas die before I actually sat down to write them. To fix this, I built a tool to close the gap:
                I write a markdown file, run a script, and the system handles the routing, metadata, and layout.
            </p>
            <h2 className='text-xl font-bold text-foreground'>The Approach</h2>
            <p className='text-foreground leading-relaxed'>
                The pipeline is simple. Posts are written as{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    .md
                </code>{' '}
                files with YAML frontmatter for metadata:
            </p>
            <CodeBlock
                code={`---
title: Some Post
date: 01/01/00
description: A short summary of the post
topics: [whatever, goes, here]
---`}
                language='yaml'
            />
            <p className='text-foreground leading-relaxed'>
                A build script scans the directory, parses the frontmatter into typed objects, and converts the body
                into an Abstract Syntax Tree (AST) using{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    mdast-util-from-markdown
                </code>
                . The script then walks this tree to generate TSX components, route entries, and a central index file.
                Now, publishing a post only requires saving a file and running a command.
            </p>
            <h2 className='text-xl font-bold text-foreground'>The Stack</h2>
            <p className='text-foreground leading-relaxed'>The tooling is kept lean:</p>
            <ul className='list-disc ml-5 space-y-2 text-foreground'>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>gray-matter</strong>: Extracts and parses the
                        YAML frontmatter.
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>mdast-util-from-markdown</strong>: Converts
                        the markdown body into a typed AST.
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>Node crypto</strong>: Handles SHA-256 content
                        hashing for the build cache.
                    </p>
                </li>
            </ul>
            <p className='text-foreground leading-relaxed'>The core logic takes just a few lines:</p>
            <CodeBlock
                code={`const fileData = matter.read(filePath);
const meta = frontMatterToFileDetails(fileData.data);
const tree = fromMarkdown(fileData.content);`}
                language='ts'
            />
            <p className='text-foreground leading-relaxed'>
                Once the metadata and AST are ready, the rest is just tree traversal and file generation.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Incremental Builds</h2>
            <p className='text-foreground leading-relaxed'>
                Initially, the script rebuilt every file from scratch on every run. This worked for a few posts but
                doesn't scale. Regenerating dozens of files because of a single typo is inefficient.
            </p>
            <p className='text-foreground leading-relaxed'>
                To solve this, I added a manifest-based caching layer. The script hashes each source file using SHA-256
                and stores these in{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    .cache/manifest.json
                </code>
                . On subsequent runs, it compares the current hashes against the manifest to identify what actually
                changed.
            </p>
            <p className='text-foreground leading-relaxed'>
                Only new or modified files trigger a rebuild. If a file is deleted, its generated TSX is removed.
                Unchanged files are skipped, though the script still reads their frontmatter to ensure the main blog
                index remains accurate. To prevent errors, the manifest is written only after a successful build,
                keeping the cache consistent.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Walking the AST</h2>
            <p className='text-foreground leading-relaxed'>
                The AST is a tree of typed nodes representing elements like headings, paragraphs, and code blocks. Each
                node has a{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    type
                </code>
                , while leaf nodes contain a{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    value
                </code>{' '}
                and parent nodes contain{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    children
                </code>
                . Mapping these to JSX happens through a recursive function:
            </p>
            <CodeBlock
                code={`function parseNode(node: Node): string {
    switch (node.type) {
        case 'heading': {
            const heading = node as Parent & { depth: number };
            const tag = \`h\${heading.depth}\`;
            const children = heading.children.map(parseNode).join('');
            return \`<\${tag}>\${children}</\${tag}>\`;
        }
        case 'paragraph': {
            const children = (node as Parent).children.map(parseNode).join('');
            return \`<p>\${children}</p>\`;
        }
        case 'text':
            return (node as any).value;
        // ... more cases for strong, emphasis, code, lists, etc.
    }
}`}
                language='ts'
            />
            <p className='text-foreground leading-relaxed'>
                This maps markdown directly to JSX. Headings become{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    h1
                </code>{' '}
                through{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    h6
                </code>
                , while lists check the{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    ordered
                </code>{' '}
                property to toggle between{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    ol
                </code>{' '}
                and{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    ul
                </code>
                . For code blocks, I integrated{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    prism-react-renderer
                </code>{' '}
                to provide syntax highlighting by default.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Generated Output</h2>
            <p className='text-foreground leading-relaxed'>
                Every markdown file results in a standalone TSX component. This component wraps the parsed content in a
                layout and passes the frontmatter as props:
            </p>
            <CodeBlock
                code={`import LogPage from '../../components/log/log-page';
import CodeBlock from '../../components/log/code-block';

export default function MarkdownToBlogPosts() {
    return (
        <LogPage
            title="Markdown to Blog Posts"
            date="Mar 8, 2026"
            topics={['AST', 'Markdown', 'Tooling']}
        >
            {/* parsed markdown content here */}
        </LogPage>
    );
}`}
                language='ts'
            />
            <p className='text-foreground leading-relaxed'>
                A generated{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    logs.ts
                </code>{' '}
                file imports these components and exports them as an array for the main listing page. The workflow is
                now as close to frictionless as possible.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Next Steps</h2>
            <p className='text-foreground leading-relaxed'>
                Currently, the node-to-component mapping is hardcoded in the switch statement. I plan to move this to a
                configuration object. Decoupling the rendering logic from the parser will make it easier to change how
                specific elements look without touching the AST walker itself.
            </p>
            <p className='text-foreground leading-relaxed'>
                The ultimate goal is to make writing the easiest part of maintaining the site.
            </p>
        </LogPage>
    );
}
