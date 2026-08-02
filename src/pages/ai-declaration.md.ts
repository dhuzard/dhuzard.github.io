import type { APIRoute } from 'astro';
import { declaration } from '~/ai-declaration';

// Serves the repo-root AI-DECLARATION.md verbatim so tooling can fetch it at
// https://dhuzard.github.io/ai-declaration.md
export const GET: APIRoute = () =>
  new Response(declaration.source, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
