---
version: "0.1.2"
level: auto
processes:
  design: pair
  implementation: auto
  documentation: copilot
  review: assist
  deployment: auto
components:
  src/components: auto
  src/layouts: auto
  src/pages: auto
  src/styles: auto
  scripts: auto
  .github: auto
  public: copilot
  src/content: assist
---

This format is based on [AI-DECLARATION.md](https://ai-declaration.md/en/0.1.2).

## Notes

- This site is engineered with coding agents. The migration to Astro, the components, layouts, styles, scaffolding scripts, and the GitHub Pages workflow were written by AI under my direction and reviewed by me before merging.
- Architecture and information design were decided together: I set the requirements and the structure, the agent proposed and implemented them.
- Everything under `src/content` is my own record — papers, talks, roles, education, awards, press. AI is used to scaffold and format those entries, never to invent them. Bibliographic facts come from the publications themselves.
- Blog posts are mine in argument and conclusion. Several were drafted or edited with AI assistance; none contain claims or citations I have not checked myself.
- `testing` is not listed, and therefore `none`: this site has no automated test suite. Verification is `npm run build` plus manual review.
- Declaring `auto` is deliberate. The point is not that no human was involved — I direct, review, and own every line here — but that you should know which parts a machine wrote, so you can read them with the right eyes.
