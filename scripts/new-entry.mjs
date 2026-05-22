#!/usr/bin/env node
// Scaffolds a new content entry. Usage:
//   npm run new:talk
//   npm run new:paper -- --doi=10.1101/xxx
//   npm run new:experience
//   npm run new:project
//   npm run new:post
//
// Interactive when stdin is a TTY; otherwise reads --key=value flags.
// Designed to be called from Claude Code slash commands with flags so no prompting is needed.

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const [, , kind, ...args] = process.argv;
if (!kind) {
  console.error('Usage: node scripts/new-entry.mjs <talk|paper|experience|project|post> [--key=value ...]');
  process.exit(1);
}

const flags = Object.fromEntries(
  args
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, ...v] = a.slice(2).split('=');
      return [k, v.join('=')];
    })
);

const tty = input.isTTY;
const rl = tty ? createInterface({ input, output }) : null;
const ask = async (label, fallback = '') => {
  if (flags[label] !== undefined) return flags[label];
  if (!rl) return fallback;
  const answer = await rl.question(`${label}${fallback ? ` [${fallback}]` : ''}: `);
  return answer.trim() || fallback;
};

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const yamlList = (items) => items.map((t) => `  - ${t}`).join('\n');
const arr = (val) => (val ? val.split(',').map((s) => s.trim()).filter(Boolean) : []);

const write = (path, content) => {
  if (existsSync(path)) {
    console.error(`Refusing to overwrite ${path}`);
    process.exit(2);
  }
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(path, content);
  console.log(`Wrote ${path}`);
};

const builders = {
  async talk() {
    const title = await ask('title');
    const date = await ask('date', new Date().toISOString().slice(0, 7));
    const venue = await ask('venue');
    const location = await ask('location');
    const type = await ask('type', 'oral');
    const tags = arr(await ask('tags'));
    const slug = `${date.replace(/-/g, '-')}-${slugify(venue || title)}`;
    const lines = [
      `title: ${JSON.stringify(title)}`,
      `date: ${JSON.stringify(date)}`,
      `venue: ${JSON.stringify(venue)}`,
      location ? `location: ${JSON.stringify(location)}` : null,
      `type: ${type}`,
      tags.length ? `tags:\n${yamlList(tags)}` : null,
    ].filter(Boolean);
    write(`src/content/talks/${slug}.yaml`, lines.join('\n') + '\n');
  },

  async paper() {
    const title = await ask('title');
    const year = Number(await ask('year', String(new Date().getFullYear())));
    const venue = await ask('venue');
    const authors = arr(await ask('authors'));
    const doi = await ask('doi');
    const url = await ask('url');
    const pdf = await ask('pdf');
    const preprint = (await ask('preprint', 'false')) === 'true';
    const tags = arr(await ask('tags'));
    const slug = `${year}-${slugify(title.split(' ').slice(0, 5).join(' '))}`;
    const lines = [
      `title: ${JSON.stringify(title)}`,
      `year: ${year}`,
      `venue: ${JSON.stringify(venue)}`,
      authors.length ? `authors:\n${yamlList(authors)}` : null,
      doi ? `doi: ${doi}` : null,
      url ? `url: ${url}` : null,
      pdf ? `pdf: ${pdf}` : null,
      preprint ? `preprint: true\ntype: preprint` : null,
      tags.length ? `tags:\n${yamlList(tags)}` : null,
    ].filter(Boolean);
    write(`src/content/papers/${slug}.yaml`, lines.join('\n') + '\n');
  },

  async experience() {
    const role = await ask('role');
    const org = await ask('org');
    const start = await ask('start');
    const end = await ask('end');
    const current = (await ask('current', end ? 'false' : 'true')) === 'true';
    const location = await ask('location');
    const kind = await ask('kind', 'academic');
    const summary = await ask('summary');
    const tags = arr(await ask('tags'));
    const slug = slugify(`${org} ${role}`);
    const lines = [
      '---',
      `role: ${JSON.stringify(role)}`,
      `org: ${JSON.stringify(org)}`,
      location ? `location: ${JSON.stringify(location)}` : null,
      `start: ${JSON.stringify(start)}`,
      end ? `end: ${JSON.stringify(end)}` : null,
      current ? 'current: true' : null,
      `kind: ${kind}`,
      summary ? `summary: ${JSON.stringify(summary)}` : null,
      tags.length ? `tags:\n${yamlList(tags)}` : null,
      '---',
      '',
      summary || '',
      '',
    ].filter((l) => l !== null);
    write(`src/content/experience/${slug}.md`, lines.join('\n'));
  },

  async project() {
    const title = await ask('title');
    const summary = await ask('summary');
    const status = await ask('status', 'active');
    const url = await ask('url');
    const repo = await ask('repo');
    const tags = arr(await ask('tags'));
    const slug = slugify(title);
    const lines = [
      '---',
      `title: ${JSON.stringify(title)}`,
      `summary: ${JSON.stringify(summary)}`,
      `status: ${status}`,
      url ? `url: ${url}` : null,
      repo ? `repo: ${repo}` : null,
      tags.length ? `tags:\n${yamlList(tags)}` : null,
      '---',
      '',
      summary,
      '',
    ].filter((l) => l !== null);
    write(`src/content/projects/${slug}.md`, lines.join('\n'));
  },

  async post() {
    const title = await ask('title');
    const date = await ask('date', new Date().toISOString().slice(0, 10));
    const excerpt = await ask('excerpt');
    const tags = arr(await ask('tags'));
    const slug = `${date}-${slugify(title)}`;
    const lines = [
      '---',
      `title: ${JSON.stringify(title)}`,
      `date: ${date}`,
      excerpt ? `excerpt: ${JSON.stringify(excerpt)}` : null,
      tags.length ? `tags:\n${yamlList(tags)}` : null,
      '---',
      '',
      'Write your post here.',
      '',
    ].filter((l) => l !== null);
    write(`src/content/posts/${slug}.md`, lines.join('\n'));
  },
};

const builder = builders[kind];
if (!builder) {
  console.error(`Unknown kind: ${kind}. Use one of: ${Object.keys(builders).join(', ')}`);
  process.exit(1);
}

try {
  await builder();
} finally {
  rl?.close();
}
