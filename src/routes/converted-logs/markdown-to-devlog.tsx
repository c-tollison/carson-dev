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
                Writing content for this site has always involved more ceremony than it should. Each new post required
                creating a component, copying boilerplate, and updating routes. None of it difficult, but enough
                friction that ideas would always died between "I should write about that" and actually doing it. The
                goal was to eliminate that gap entirely: write a markdown file, run a script, and have a fully rendered
                blog post with routing, metadata, and layout handled automatically.
            </p>
            <h2 className='text-xl font-bold text-foreground'>The Approach</h2>
            <p className='text-foreground leading-relaxed'>
                The pipeline is straightforward. Each post lives as a{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    .md
                </code>{' '}
                file with YAML frontmatter:
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
                A build script picks up every markdown file in the dev-logs directory, parses the frontmatter into a
                typed object, and converts the body into an AST using{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    mdast-util-from-markdown
                </code>
                . From there, it walks the tree and emits TSX components, route entries, and an index file that ties
                everything together. Adding a new post is a single file drop and a script invocation-no route updates,
                no boilerplate.
            </p>
            <h2 className='text-xl font-bold text-foreground'>The Stack</h2>
            <p className='text-foreground leading-relaxed'>The core tooling is minimal:</p>
            <ul className='list-disc ml-5 space-y-2 text-foreground'>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>gray-matter</strong> for stripping and parsing
                        the YAML frontmatter block
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>mdast-util-from-markdown</strong> for
                        converting the markdown body into a typed AST
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>Node crypto</strong> for SHA-256 content
                        hashing
                    </p>
                </li>
            </ul>
            <p className='text-foreground leading-relaxed'>The parsing itself fits in a few lines:</p>
            <CodeBlock
                code={`const fileData = matter.read(filePath);
const meta = frontMatterToFileDetails(fileData.data);
const tree = fromMarkdown(fileData.content);`}
                language='ts'
            />
            <p className='text-foreground leading-relaxed'>
                Metadata in, AST out. Everything downstream is tree traversal and file emission.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Incremental Builds</h2>
            <p className='text-foreground leading-relaxed'>
                The first version of the script rebuilt every generated file on each run. This worked, but it scaled
                poorly-regenerating twenty files because of a typo in one is wasteful, and the problem only compounds as
                the number of posts grows.
            </p>
            <p className='text-foreground leading-relaxed'>
                To address this, I added a manifest-based caching layer. Each source file is hashed with SHA-256, and
                the hashes are stored in{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    .cache/manifest.json
                </code>
                . On each subsequent run, the script compares current hashes against the manifest to produce four
                buckets:
            </p>
            <ul className='list-disc ml-5 space-y-2 text-foreground'>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>New files</strong> - not yet in the manifest
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>Modified files</strong> - hash has changed
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>Unchanged files</strong> - hash matches, skip
                        AST parsing entirely
                    </p>
                </li>
                <li className='leading-relaxed'>
                    <p className='text-foreground leading-relaxed'>
                        <strong className='font-semibold text-foreground'>Deleted files</strong> - present in the
                        manifest but removed from disk
                    </p>
                </li>
            </ul>
            <p className='text-foreground leading-relaxed'>
                Only new and modified files trigger regeneration. Deleted files have their generated TSX cleaned up.
                Unchanged files skip the expensive AST pass-the script reads only their frontmatter to rebuild the
                index. The manifest is written atomically after a successful run, so a failed build never leaves the
                cache in an inconsistent state.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Walking the AST</h2>
            <p className='text-foreground leading-relaxed'>
                The AST produced by{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    mdast-util-from-markdown
                </code>{' '}
                is a tree of typed nodes. Each node carries a{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    type
                </code>
                -
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    heading
                </code>
                ,{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    paragraph
                </code>
                ,{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    text
                </code>
                ,{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    strong
                </code>
                ,{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    code
                </code>
                , and so on-with leaf nodes holding a{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    value
                </code>{' '}
                and parent nodes holding{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    children
                </code>
                . The mapping from AST to JSX is a recursive switch over node types:
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
                Each case maps a markdown node to a JSX string. Headings resolve to{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    h1
                </code>{' '}
                through{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    h6
                </code>{' '}
                based on depth, lists inspect{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    ordered
                </code>{' '}
                to choose{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    ol
                </code>{' '}
                or{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    ul
                </code>
                , and unhandled node types log a warning so gaps are visible immediately. Syntax highlighting is in
                place. Code blocks are routed through{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    prism-react-renderer
                </code>{' '}
                via a{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    CodeBlock
                </code>{' '}
                component, providing token-level coloring out of the box.
            </p>
            <h2 className='text-xl font-bold text-foreground'>Generated Output</h2>
            <p className='text-foreground leading-relaxed'>
                Each markdown file produces a standalone TSX component that wraps parsed content in a{' '}
                <code className='bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground'>
                    LogPage
                </code>{' '}
                layout, with frontmatter passed as props:
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
                index imports every component and exports them as a typed array, which the listing page consumes
                directly. The result is that the entire publishing workflow reduces to dropping a file in a folder and
                running the build.
            </p>
            <h2 className='text-xl font-bold text-foreground'>What's Next</h2>
            <p className='text-foreground leading-relaxed'>
                The next step is making the node-to-component mapping config-driven. Currently, every node type is
                hardcoded in the switch statement. A mapping object that declares "headings use this component, code
                blocks use that one" would decouple rendering decisions from the parser itself, making it possible to
                change how any element renders without modifying the AST walker.
            </p>
            <blockquote className='border-l-4 border-primary pl-4 py-2 italic text-muted-foreground'>
                <p className='text-foreground leading-relaxed'>
                    The goal is to make writing the easiest part of maintaining this site.
                </p>
            </blockquote>
        </LogPage>
    );
}
