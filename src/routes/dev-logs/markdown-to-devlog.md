---
title: Markdown to blog posts
date: 03/08/26
description: Created a tool that will convert my markdown files to blog posts
topics: [AST, Markdown, idk random]
---

# Markdown to Blog Posts

I got tired of writing blog posts in HTML. I wanted to just write markdown and have it show up on my site as a real page — styled, typed, and ready to go. So I built a small tool that does exactly that.

## The Problem

Every time I wanted to post something on my site, I had to:

- Write the content
- Manually create a Vue component for it
- Copy over the same boilerplate layout and meta tags
- Hope I didn't forget to update the route

It's not a lot of work for one post, but it adds up. And more importantly, the friction meant I just... didn't write.

## The Approach

The idea is simple. I write a `.md` file with some frontmatter at the top:

```yaml
---
title: Some Post
date: 03/08/26
description: A short summary of the post
---
```

Then a script reads every markdown file in my dev-logs folder, parses the frontmatter into a typed object, and converts the body into an AST using `mdast-util-from-markdown`. From there I can walk the tree and generate whatever I need — react components, route entries, metadata files, etc.

## The Stack

Here's what I'm using:

- **gray-matter** — strips and parses the YAML frontmatter block
- **mdast-util-from-markdown** — turns the markdown body into a typed AST
- **Node fs/path** — reads the files from the dev-logs directory

The core of it fits in one function:

```ts
const fileData = matter.read(filePath);
const meta = frontMatterToFileDetails(fileData.data);
const tree = fromMarkdown(fileData.content);
```

Three lines. Metadata in, AST out. Everything after that is just walking nodes and emitting files.

## Why This Rules

Writing markdown is fast. There's no context switching between "writing mode" and "dev mode." I open a file, write what I'm thinking, and the tooling handles the rest. The frontmatter gives me a clean contract — every post has a title, date, and description, enforced at build time. If I forget a field, it throws instead of silently rendering a broken page.

It also means my content lives as plain files in the repo. No CMS, no database, no third-party dependency. Just markdown in a folder.

## What's Next

Right now the script just logs the parsed output. The next step is mapping AST nodes to Vue components — headings, paragraphs, code blocks, lists, all of it. I want a config-driven mapping so I can swap out how any node type renders without touching the parser.

> The goal is to make writing the easiest part of maintaining this site.

After that, probably auto-generating route entries and an index page so new posts just show up when I drop a file in the folder.
