# dhuzard.github.io

[![AI-DECLARATION: auto](https://img.shields.io/badge/䷼%20AI--DECLARATION-auto-ede9fe?labelColor=ede9fe)](./AI-DECLARATION.md)

Personal site for Damien Huzard — neuro-physio-behaviorist, PhD. Built with **Astro 5 + Tailwind + MDX**, deployed to GitHub Pages.

## Quick start

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # produces dist/
```

## Add new content

```bash
npm run new:paper       # new paper / preprint
npm run new:talk        # new talk / conference
npm run new:experience  # new role / job
npm run new:project     # new project
npm run new:post        # new blog post
```

Or, with Claude Code, use the slash commands: `/new-paper`, `/new-talk`, `/new-experience`, `/new-project`, `/new-post`.

See [`AGENTS.md`](./AGENTS.md) for details on layout, schemas, and conventions.

## Deploy

Push to `master`; the GitHub Action in `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.
