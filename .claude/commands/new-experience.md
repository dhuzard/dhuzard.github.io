---
description: Add a new role / job to the CV
argument-hint: <role and org>
allowed-tools: Bash(node scripts/new-entry.mjs:*), Read, Edit, Write
---

Add a new experience entry. Input: "$ARGUMENTS".

Fields:
- `role` (required)
- `org` (required)
- `start` (required) — `YYYY-MM` or `YYYY`
- `end` (optional) — leave empty for ongoing roles
- `current` (optional) — `true` if ongoing
- `location` (optional)
- `kind` — one of `industry`, `academic`, `community` (default `academic`)
- `summary` (optional) — one sentence
- `tags` (optional)

Run:
```
node scripts/new-entry.mjs experience \
  --role="..." --org="..." --start=YYYY-MM \
  [--end=YYYY-MM] [--current=true] [--location="..."] \
  [--kind=industry|academic|community] [--summary="..."] [--tags="a,b"]
```

If the role has bullet points or longer detail, append them as markdown to the body of the resulting file under `src/content/experience/`.
