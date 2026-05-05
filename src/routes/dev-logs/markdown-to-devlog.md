---
title: Markdown to Blog Posts
date: 03/09/26
description: Building a script to convert markdown files into rendered TSX components.
topics: [AST, Markdown, Tooling]
---

Writing for this site used to involve too much ceremony. Every new post meant manually creating components, copying boilerplate, and updating routes. It wasn't difficult, but the friction was enough to let ideas die before I actually sat down to write them. To fix this, I built a tool to close the gap: I write a markdown file, run a script, and the system handles the routing, metadata, and layout.

## The Approach

The pipeline is simple. Posts are written as `.md` files with YAML frontmatter for metadata:

```yaml
---
title: Some Post
date: 01/01/00
description: A short summary of the post
topics: [whatever, goes, here]
---
```

A build script scans the directory, parses the frontmatter into typed objects, and converts the body into an Abstract Syntax Tree (AST) using `mdast-util-from-markdown`. The script then walks this tree to generate TSX components, route entries, and a central index file. Now, publishing a post only requires saving a file and running a command.

## The Stack

The tooling is kept lean:

- **gray-matter**: Extracts and parses the YAML frontmatter.
- **mdast-util-from-markdown**: Converts the markdown body into a typed AST.
- **Node crypto**: Handles SHA-256 content hashing for the build cache.

The core logic takes just a few lines:

```ts
const fileData = matter.read(filePath);
const meta = frontMatterToFileDetails(fileData.data);
const tree = fromMarkdown(fileData.content);
```

Once the metadata and AST are ready, the rest is just tree traversal and file generation.

## Incremental Builds

Initially, the script rebuilt every file from scratch on every run. This worked for a few posts but doesn't scale. Regenerating dozens of files because of a single typo is inefficient.

To solve this, I added a manifest-based caching layer. The script hashes each source file using SHA-256 and stores these in `.cache/manifest.json`. On subsequent runs, it compares the current hashes against the manifest to identify what actually changed.

Only new or modified files trigger a rebuild. If a file is deleted, its generated TSX is removed. Unchanged files are skipped, though the script still reads their frontmatter to ensure the main blog index remains accurate. To prevent errors, the manifest is written only after a successful build, keeping the cache consistent.

## Walking the AST

The AST is a tree of typed nodes representing elements like headings, paragraphs, and code blocks. Each node has a `type`, while leaf nodes contain a `value` and parent nodes contain `children`. Mapping these to JSX happens through a recursive function:

```ts
function parseNode(node: Node): string {
    switch (node.type) {
        case 'heading': {
            const heading = node as Parent & { depth: number };
            const tag = `h${heading.depth}`;
            const children = heading.children.map(parseNode).join('');
            return `<${tag}>${children}</${tag}>`;
        }
        case 'paragraph': {
            const children = (node as Parent).children.map(parseNode).join('');
            return `<p>${children}</p>`;
        }
        case 'text':
            return (node as any).value;
        // ... more cases for strong, emphasis, code, lists, etc.
    }
}
```

This maps markdown directly to JSX. Headings become `h1` through `h6`, while lists check the `ordered` property to toggle between `ol` and `ul`. For code blocks, I integrated `prism-react-renderer` to provide syntax highlighting by default.

## Generated Output

Every markdown file results in a standalone TSX component. This component wraps the parsed content in a layout and passes the frontmatter as props:

```ts
import LogPage from '../../components/log/log-page';
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
}
```

A generated `logs.ts` file imports these components and exports them as an array for the main listing page. The workflow is now as close to frictionless as possible.

## Next Steps

Currently, the node-to-component mapping is hardcoded in the switch statement. I plan to move this to a configuration object. Decoupling the rendering logic from the parser will make it easier to change how specific elements look without touching the AST walker itself.

The ultimate goal is to make writing the easiest part of maintaining the site.
