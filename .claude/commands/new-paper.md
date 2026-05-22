---
description: Add a new paper / preprint to the CV
argument-hint: <DOI, URL, or details>
allowed-tools: Bash(node scripts/new-entry.mjs:*), WebFetch, Read, Edit, Write
---

The user wants to add a paper. Input: "$ARGUMENTS".

If the input is a **DOI or URL**:
1. Use WebFetch on `https://api.crossref.org/works/<DOI>` or the URL to retrieve title, authors, venue, year.
2. Confirm fields with the user only if anything is ambiguous (preprint vs. article, equal-contribution authors).

If the input is **free text**: parse what you can, ask only for what's missing.

Fields:
- `title` (required)
- `year` (required)
- `venue` (required) — journal name + volume/issue if known
- `authors` (required) — comma-separated, in order; use `Lastname I` form (e.g. `Huzard D`)
- `doi` (optional)
- `url` (optional) — link to the journal page or preprint
- `pdf` (optional) — relative path under `/assets/PDFs/...`
- `preprint` (optional) — `true` for preprints / bioRxiv etc.
- `tags` (optional) — comma-separated

Run:
```
node scripts/new-entry.mjs paper \
  --title="..." --year=YYYY --venue="..." \
  --authors="A, B, Huzard D, C" \
  [--doi=10.xxx/yyy] [--url=...] [--preprint=true] [--tags="a,b"]
```

After writing, open the file to verify, fix author capitalisation if Crossref returned weird casing, and confirm.
