# AGENTS.md — Working on this site

Personal website for Damien Huzard. Stack: **Astro 5 + Tailwind + MDX + typed content collections**, deployed to **GitHub Pages** via Actions.

## Top priorities for an agent

1. **Treat content as data**, not as styled HTML. Every paper, talk, experience, etc. is one file in `src/content/<kind>/`. Schemas live in `src/content/config.ts`. If a field doesn't fit the schema, extend the schema rather than inlining HTML.
2. **Use the scaffolding scripts**, don't hand-write boilerplate. See "Adding content" below.
3. **Match existing patterns**. Reuse components in `src/components/` (`PaperItem`, `TalkItem`, `ExperienceItem`, `Section`). Don't introduce CSS frameworks beyond Tailwind, and don't add inline styles unless the rest of the file already does.
4. **Keep edits small.** No refactors unless asked.
5. **Verify the build** with `npm run build` before opening a PR or pushing.

## Repo layout

```
src/
  content/
    config.ts              # All collection schemas (Zod). Source of truth.
    papers/<slug>.yaml     # One file per paper
    talks/<slug>.yaml      # One file per talk
    experience/<slug>.md   # Roles & jobs (markdown body = details)
    education/<slug>.md
    projects/<slug>.md     # Projects (markdown body = long description)
    posts/<slug>.md|mdx    # Blog posts
    awards/<slug>.yaml
    press/<slug>.yaml
    students/<slug>.yaml
    responsibilities/<slug>.yaml
  pages/                   # Routes (.astro / .ts)
  components/              # Reusable UI
  layouts/Base.astro       # Site shell
  styles/global.css        # Tailwind base + components
  site.config.ts           # Name, email, nav, social, ventures
public/                    # Static files served as-is (assets, HCM apps, PDFs)
scripts/new-entry.mjs      # Scaffolds new content entries
_legacy/                   # Old Jekyll source (reference only, not built)
```

## Adding content

Each command writes one file under `src/content/<kind>/` and nothing else. The page that lists them re-renders automatically. **Always prefer these over hand-writing YAML.**

```bash
npm run new:talk        # → src/content/talks/YYYY-MM-slug.yaml
npm run new:paper       # → src/content/papers/YYYY-slug.yaml
npm run new:experience  # → src/content/experience/slug.md
npm run new:project     # → src/content/projects/slug.md
npm run new:post        # → src/content/posts/YYYY-MM-DD-slug.md
```

All scripts accept **non-interactive flags** so Claude Code can call them without prompting:

```bash
node scripts/new-entry.mjs talk \
  --title="The skin is the new brain" \
  --date=2024-11 \
  --venue="NeuroFrance" \
  --location="Lyon" \
  --type=oral \
  --tags="C-LTMR,sociability"
```

Slash commands wrap these:
- `/new-talk`, `/new-paper`, `/new-experience`, `/new-project`, `/new-post` (see `.claude/commands/`).

## Schemas (where fields live)

Adding or changing a field? Edit `src/content/config.ts`. Schemas use Zod; values are validated at build time and 404 the build if invalid — this is intentional.

Important conventions:
- Dates as strings (`YYYY`, `YYYY-MM`, or `YYYY-MM-DD`), quoted when ambiguous.
- Paper authors are an array of strings; `me: "Huzard D"` is auto-bolded in `PaperItem`.
- Equal-contribution authors go in `equalContribution: [...]`.
- Project `url` and `repo` accept relative paths (e.g. `/assets/hcm-app/`).

## Editing the home / CV / Papers / Talks pages

These pages don't contain content — they only iterate over collections. To **change wording or visual structure**, edit the `.astro` file. To **add an entry**, add a content file.

## Declarations page

`/declarations/` (`src/pages/declarations.astro`) holds both transparency statements: the
conflict-of-interest statement (prose, edited in place) and the AI declaration. The old `/coi` and
`/ai-declaration` URLs redirect to its anchors — see `astro.config.mjs`.

`AI-DECLARATION.md` at the repo root follows the [AI-DECLARATION.md](https://ai-declaration.md/en/0.1.2)
standard and is the single source of truth for the AI half: `src/components/AiDeclaration.astro` renders it,
and `src/pages/ai-declaration.md.ts` serves it verbatim at `/ai-declaration.md`. Parsing and validation live
in `src/ai-declaration.ts` — an invalid level, an unknown process, or a global `level` lower than the highest
declared level fails the build. If your work materially changes how AI is used here (a new hand-written
component, a new AI-generated directory), update the declaration in the same commit; don't edit the page to
say something the file doesn't.

## Styling

Tailwind utilities first. Reusable patterns live in `src/styles/global.css` under `@layer components` (`.card`, `.badge`, `.section-title`, `.container-prose`, etc.). Dark mode uses the `dark:` variant; toggled by `Header.astro`.

## Deploy

`master` branch → GitHub Action `.github/workflows/deploy.yml` builds Astro and publishes to GitHub Pages. To work on a feature, push a branch and rely on the build to validate.

## Local dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # produces dist/
npm run preview  # serves dist/
```

## What NOT to do

- Don't reintroduce Jekyll (`_config.yml`, `Gemfile`, `_data`, `_posts`). The old setup is preserved in `_legacy/` for reference only and is excluded from the build.
- Don't paste hand-styled HTML cards into the listing pages. Add a content entry and let the component render it.
- Don't break the URL contract for legacy paths — redirects live in `astro.config.mjs`. If you rename a post slug, add a redirect.
- Don't add heavy JS dependencies. Astro ships zero JS by default; keep it that way.
- Don't commit `node_modules/`, `dist/`, or `.astro/`.
