---
description: Add a new project to the projects page
argument-hint: <project title>
allowed-tools: Bash(node scripts/new-entry.mjs:*), Read, Edit, Write
---

Add a new project. Input: "$ARGUMENTS".

Fields:
- `title` (required)
- `summary` (required) — one sentence describing what it is
- `status` — `active` | `maintenance` | `archived` (default `active`)
- `url` (optional) — can be external (`https://...`) or internal (`/projects/foo/`)
- `repo` (optional) — GitHub URL
- `tags` (optional)
- `featured` (optional) — set to `true` to surface it on the home page (top 3 by `order` are shown)

Run:
```
node scripts/new-entry.mjs project \
  --title="..." --summary="..." \
  [--status=active] [--url=...] [--repo=...] [--tags="a,b"]
```

After creation, write a longer description as markdown in the body. If the project has an image, drop it into `public/assets/images/` and set `image: /assets/images/foo.png` in the frontmatter.
