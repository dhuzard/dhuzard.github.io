#!/usr/bin/env node
/**
 * Fetch Google Scholar metrics and write them to src/data/scholar.json.
 *
 * Google Scholar has no official API, blocks browser (CORS) access, and rate-
 * limits / CAPTCHAs automated requests from cloud IPs. So this runs at build
 * time (via a scheduled GitHub Action), never in the visitor's browser, and is
 * written to DEGRADE GRACEFULLY: if a fetch fails, the previous JSON is kept
 * untouched and the script still exits 0 so the site build never breaks.
 *
 * Two data sources, tried in order:
 *   1. SerpApi  — reliable, used when SERPAPI_KEY is set (free tier ~100/mo).
 *   2. Direct   — scrapes the public profile HTML (works intermittently).
 *
 * Usage:
 *   node scripts/fetch-scholar.mjs
 *   SERPAPI_KEY=xxxx node scripts/fetch-scholar.mjs
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, '../src/data/scholar.json');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function readCurrent() {
  try {
    return JSON.parse(await readFile(DATA_PATH, 'utf8'));
  } catch {
    return {};
  }
}

/** SerpApi: engine=google_scholar_author. Returns null if key absent/failed. */
async function fetchViaSerpApi(userId) {
  const key = process.env.SERPAPI_KEY;
  if (!key) return null;
  const url =
    `https://serpapi.com/search.json?engine=google_scholar_author` +
    `&author_id=${encodeURIComponent(userId)}&hl=en&api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`SerpApi HTTP ${res.status}`);
  const json = await res.json();
  const table = json?.cited_by?.table ?? [];
  const pick = (name) => table.find((r) => r[name])?.[name] ?? {};
  const citations = pick('citations');
  const hIndex = pick('h_index');
  const i10 = pick('i10_index');
  if (citations.all == null) throw new Error('SerpApi returned no citations');
  return {
    source: 'serpapi',
    sinceYear: json?.cited_by?.table?.[0]?.citations?.since_year ?? null,
    citations: Number(citations.all) || null,
    citationsRecent: Number(citations.since_year) || null,
    hIndex: Number(hIndex.all) || null,
    hIndexRecent: Number(hIndex.since_year) || null,
    i10Index: Number(i10.all) || null,
    i10Recent: Number(i10.since_year) || null,
  };
}

/** Direct scrape of the public citations profile page. */
async function fetchViaScrape(userId) {
  const url = `https://scholar.google.com/citations?user=${userId}&hl=en`;
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' },
  });
  if (!res.ok) throw new Error(`Scholar HTTP ${res.status}`);
  const html = await res.text();
  if (/unusual traffic|not a robot|please show you're not a robot/i.test(html)) {
    throw new Error('Scholar returned a CAPTCHA / robot check');
  }
  // The stats table (#gsc_rsb_st) lists six numbers, in order:
  // Citations[all, since], h-index[all, since], i10-index[all, since].
  const nums = [...html.matchAll(/gsc_rsb_std">(\d+)</g)].map((m) => Number(m[1]));
  if (nums.length < 6) throw new Error(`Parsed only ${nums.length} stats (need 6)`);
  const since = html.match(/gsc_rsb_sth">Since (\d{4})</);
  return {
    source: 'scrape',
    sinceYear: since ? Number(since[1]) : null,
    citations: nums[0],
    citationsRecent: nums[1],
    hIndex: nums[2],
    hIndexRecent: nums[3],
    i10Index: nums[4],
    i10Recent: nums[5],
  };
}

async function main() {
  const current = await readCurrent();
  const userId = current.userId || process.env.SCHOLAR_USER || 'tviZqssAAAAJ';

  let metrics = null;
  for (const [label, fn] of [
    ['SerpApi', fetchViaSerpApi],
    ['scrape', fetchViaScrape],
  ]) {
    try {
      metrics = await fn(userId);
      if (metrics) {
        console.log(`✓ Fetched Scholar metrics via ${label}.`);
        break;
      }
    } catch (err) {
      console.warn(`× ${label} failed: ${err.message}`);
    }
  }

  if (!metrics) {
    console.warn(
      '! No source succeeded. Keeping last-known values; site build unaffected.',
    );
    process.exit(0); // never fail the build/action on a transient block
  }

  const next = {
    ...current,
    ...metrics,
    userId,
    profileUrl: `https://scholar.google.com/citations?user=${userId}&hl=en`,
    updated: new Date().toISOString().slice(0, 10),
  };
  delete next._note;

  const changed =
    current.citations !== next.citations ||
    current.hIndex !== next.hIndex ||
    current.i10Index !== next.i10Index;

  await writeFile(DATA_PATH, JSON.stringify(next, null, 2) + '\n');
  console.log(
    `${changed ? '✓ Updated' : '= No change to'} metrics: ` +
      `${next.citations} citations · h-index ${next.hIndex} · i10 ${next.i10Index}`,
  );
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(0); // still don't break the build
});
