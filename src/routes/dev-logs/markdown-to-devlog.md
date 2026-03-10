---
title: Markdown to Blog Posts
date: 03/09/26
description: Created a tool that will convert my markdown files to blog posts
topics: [AST, Markdown, Tooling]
---

Writing content for this site has always involved more ceremony than it should. Each new post required creating a component, copying boilerplate, and updating routes. None of it difficult, but enough friction that ideas would always died between "I should write about that" and actually doing it. The goal was to eliminate that gap entirely: write a markdown file, run a script, and have a fully rendered blog post with routing, metadata, and layout handled automatically.

## The Approach

The pipeline is straightforward. Each post lives as a `.md` file with YAML frontmatter:

```yaml
---
title: Some Post
date: 01/01/00
description: A short summary of the post
topics: [whatever, goes, here]
---
```

A build script picks up every markdown file in the dev-logs directory, parses the frontmatter into a typed object, and converts the body into an AST using `mdast-util-from-markdown`. From there, it walks the tree and emits TSX components, route entries, and an index file that ties everything together. Adding a new post is a single file drop and a script invocation-no route updates, no boilerplate.

## The Stack

The core tooling is minimal:

- **gray-matter** for stripping and parsing the YAML frontmatter block
- **mdast-util-from-markdown** for converting the markdown body into a typed AST
- **Node crypto** for SHA-256 content hashing

The parsing itself fits in a few lines:

```ts
const fileData = matter.read(filePath);
const meta = frontMatterToFileDetails(fileData.data);
const tree = fromMarkdown(fileData.content);
```

Metadata in, AST out. Everything downstream is tree traversal and file emission.

## Incremental Builds

The first version of the script rebuilt every generated file on each run. This worked, but it scaled poorly-regenerating twenty files because of a typo in one is wasteful, and the problem only compounds as the number of posts grows.

To address this, I added a manifest-based caching layer. Each source file is hashed with SHA-256, and the hashes are stored in `.cache/manifest.json`. On each subsequent run, the script compares current hashes against the manifest to produce four buckets:

- **New files** - not yet in the manifest
- **Modified files** - hash has changed
- **Unchanged files** - hash matches, skip AST parsing entirely
- **Deleted files** - present in the manifest but removed from disk

Only new and modified files trigger regeneration. Deleted files have their generated TSX cleaned up. Unchanged files skip the expensive AST pass-the script reads only their frontmatter to rebuild the index. The manifest is written atomically after a successful run, so a failed build never leaves the cache in an inconsistent state.

## Walking the AST

The AST produced by `mdast-util-from-markdown` is a tree of typed nodes. Each node carries a `type`-`heading`, `paragraph`, `text`, `strong`, `code`, and so on-with leaf nodes holding a `value` and parent nodes holding `children`. The mapping from AST to JSX is a recursive switch over node types:

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

Each case maps a markdown node to a JSX string. Headings resolve to `h1` through `h6` based on depth, lists inspect `ordered` to choose `ol` or `ul`, and unhandled node types log a warning so gaps are visible immediately. Syntax highlighting is in place. Code blocks are routed through `prism-react-renderer` via a `CodeBlock` component, providing token-level coloring out of the box.

## Generated Output

Each markdown file produces a standalone TSX component that wraps parsed content in a `LogPage` layout, with frontmatter passed as props:

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

A generated `logs.ts` index imports every component and exports them as a typed array, which the listing page consumes directly. The result is that the entire publishing workflow reduces to dropping a file in a folder and running the build.

## What's Next

The next step is making the node-to-component mapping config-driven. Currently, every node type is hardcoded in the switch statement. A mapping object that declares "headings use this component, code blocks use that one" would decouple rendering decisions from the parser itself, making it possible to change how any element renders without modifying the AST walker.

> The goal is to make writing the easiest part of maintaining this site.
