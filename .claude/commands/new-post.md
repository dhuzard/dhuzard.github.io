---
description: Scaffold and draft a new blog post
argument-hint: <topic or title>
allowed-tools: Bash(node scripts/new-entry.mjs:*), Read, Edit, Write
---

Draft a new blog post. Topic / title: "$ARGUMENTS".

1. Run the scaffold:
   ```
   node scripts/new-entry.mjs post --title="..." --tags="a,b" [--excerpt="..."]
   ```
2. Open the new file under `src/content/posts/` and write the body in markdown.
3. If the post has a hero image, drop the file in `public/assets/images/` and add `image: /assets/images/foo.png` to the frontmatter.
4. Match the tone of recent posts (`src/content/posts/2025-*.md`): short paragraphs, concrete examples, FAIRRR / metadata / behavior themes when relevant.
5. Verify it appears on `/blog/` by running `npm run build` (or just trust the schema validation).

Leave `draft: true` in the frontmatter if it isn't ready to publish.
