#!/usr/bin/env node
// One-shot script: migrate Jekyll posts in _legacy/_posts/ to src/content/posts/
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = '_legacy/_posts';
const DEST = 'src/content/posts';

if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const files = readdirSync(SRC).filter((f) => f.endsWith('.md'));

const stripField = (fm, name) =>
  fm.replace(new RegExp(`^${name}:.*$`, 'm'), '').replace(/\n{3,}/g, '\n\n');

for (const file of files) {
  const raw = readFileSync(join(SRC, file), 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    console.warn('Skipping (no frontmatter):', file);
    continue;
  }
  let [, fm, body] = match;

  const m = file.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
  if (!m) {
    console.warn('Skipping (bad filename):', file);
    continue;
  }
  const [, y, mo, d, slugRaw] = m;
  const date = `${y}-${mo}-${d}`;
  const slug = slugRaw.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  let title = '';
  let excerpt = '';
  let image = '';
  let tags = [];

  const titleMatch = fm.match(/^title:\s*['"]?(.+?)['"]?\s*$/m);
  if (titleMatch) title = titleMatch[1].replace(/^"|"$/g, '').replace(/^'|'$/g, '');

  const excerptMatch = fm.match(/^excerpt:\s*(.+)$/m);
  if (excerptMatch) excerpt = excerptMatch[1].trim().replace(/^["']|["']$/g, '');

  const headerImgMatch = fm.match(/^\s+image:\s*(\S+)/m);
  if (headerImgMatch) image = headerImgMatch[1];
  const teaserMatch = fm.match(/^\s+teaser:\s*(\S+)/m);
  if (!image && teaserMatch) image = teaserMatch[1];

  const tagsBlock = fm.match(/^tags:\s*\n((?:\s+-\s+.+\n?)+)/m);
  if (tagsBlock) {
    tags = tagsBlock[1]
      .split('\n')
      .map((l) => l.replace(/^\s*-\s+/, '').trim())
      .filter(Boolean);
  } else {
    const inline = fm.match(/^tags:\s*\[(.+)\]\s*$/m);
    if (inline) tags = inline[1].split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''));
  }

  body = body.replace(/\/Blog\/([a-z0-9-]+)\/?/gi, '/blog/$1/');
  body = body.replace(/\{:\s*\.[^}]+\}/g, '');

  const newFm = ['---', `title: ${JSON.stringify(title)}`, `date: ${date}`];
  if (excerpt) newFm.push(`excerpt: ${JSON.stringify(excerpt)}`);
  if (image) newFm.push(`image: ${image}`);
  if (tags.length) {
    newFm.push('tags:');
    for (const t of tags) newFm.push(`  - ${t}`);
  }
  newFm.push('---', '');

  const outPath = join(DEST, `${date}-${slug}.md`);
  writeFileSync(outPath, newFm.join('\n') + body.trimStart() + '\n');
  console.log('Migrated:', file, '→', outPath);
}
