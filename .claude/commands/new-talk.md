---
description: Add a new talk / conference / webinar to the CV
argument-hint: <title or details>
allowed-tools: Bash(node scripts/new-entry.mjs:*), Read, Edit, Write
---

The user wants to add a new talk. Gather these fields (ask the user only for what's missing from the message: "$ARGUMENTS"), then run the scaffolding script and edit the resulting file if needed.

Required:
- `title` — talk title
- `date` — `YYYY-MM` (or `YYYY` if month unknown)
- `venue` — conference / event name
- `type` — one of: `oral`, `invited`, `keynote`, `poster`, `webinar`, `short`, `participation`

Optional:
- `location` — city, country
- `slides` — URL to slides
- `video` — URL to recording
- `paper` — URL to related paper
- `abstract` — short paragraph
- `tags` — comma-separated

Call the script non-interactively. Quote values that contain spaces or commas.

```
node scripts/new-entry.mjs talk \
  --title="..." --date=YYYY-MM --venue="..." --type=... \
  [--location="..."] [--tags="a,b"] [--slides=URL] [--video=URL]
```

After creating, show the file path back and remind the user to commit.
