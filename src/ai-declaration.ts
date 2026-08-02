// Parses the repo-root AI-DECLARATION.md so the site renders the *same* file
// that lives at the root of the repository — there is one source of truth.
// Spec: https://ai-declaration.md/en/0.1.2
import raw from '../AI-DECLARATION.md?raw';

export const LEVELS = ['none', 'hint', 'assist', 'pair', 'copilot', 'auto'] as const;
export type Level = (typeof LEVELS)[number];

/** Level definitions, verbatim from the 0.1.2 specification. */
export const LEVEL_DEFINITIONS: Record<Level, string> = {
  none: 'Human acts on the task alone with no AI involvement.',
  hint: 'Human acts on the task and the AI surfaces suggestions passively.',
  assist: 'Human prompts and the AI acts on a part of the task.',
  pair: 'Human prompts as both human and AI both act on the task equally; Human understands internals clearly.',
  copilot:
    'Human prompts and AI acts on the whole task, prompting the Human for permission or clarification.',
  auto: 'Human prompts and AI acts autonomously bringing the task to completion.',
};

/** Badge colours mirror the shields.io palette used by the specification. */
export const LEVEL_CLASSES: Record<Level, string> = {
  none: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
  hint: 'bg-lime-100 text-lime-900 dark:bg-lime-950 dark:text-lime-200',
  assist: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-200',
  pair: 'bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200',
  copilot: 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200',
  auto: 'bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-200',
};

/** The six process categories defined by the spec, in spec order. */
export const PROCESSES = [
  'design',
  'implementation',
  'testing',
  'documentation',
  'review',
  'deployment',
] as const;
export type Process = (typeof PROCESSES)[number];

export const PROCESS_DEFINITIONS: Record<Process, string> = {
  design: 'Architecture, system design, and decision-making.',
  implementation: 'Writing production code.',
  testing: 'Writing tests, test plans, and quality assurance.',
  documentation: 'Writing docs, comments, READMEs, and changelogs.',
  review: 'Code review and pull request feedback.',
  deployment: 'CI/CD configuration, infrastructure, and release scripts.',
};

export interface Declaration {
  version: string;
  level: Level;
  /** Every process, with unlisted ones resolved to `none` as the spec requires. */
  processes: Record<Process, Level>;
  components: Array<{ path: string; level: Level }>;
  /** Bullets of the `## Notes` section, as inline markdown. */
  notes: string[];
  /** The file as it sits on disk, served verbatim at /ai-declaration.md */
  source: string;
}

function assertLevel(value: string, where: string): Level {
  if (!(LEVELS as readonly string[]).includes(value)) {
    throw new Error(`AI-DECLARATION.md: "${value}" is not a valid level (at ${where}).`);
  }
  return value as Level;
}

/**
 * Minimal YAML reader for the shape the spec allows: scalars at the top level
 * and one level of `key: level` nesting. Deliberately not a general parser —
 * anything outside the schema should fail the build rather than be guessed at.
 */
function parseFrontmatter(block: string) {
  const scalars: Record<string, string> = {};
  const maps: Record<string, Record<string, string>> = {};
  let currentMap: string | null = null;

  for (const line of block.split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;

    const indented = /^\s/.test(line);
    const separator = line.indexOf(':');
    if (separator === -1) throw new Error(`AI-DECLARATION.md: cannot parse line "${line}".`);

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, '');

    if (indented) {
      if (!currentMap) throw new Error(`AI-DECLARATION.md: orphan indented key "${key}".`);
      maps[currentMap][key] = value;
    } else if (value === '') {
      currentMap = key;
      maps[key] = {};
    } else {
      currentMap = null;
      scalars[key] = value;
    }
  }

  return { scalars, maps };
}

function parse(file: string): Declaration {
  const match = file.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error('AI-DECLARATION.md: missing YAML frontmatter.');

  const [, frontmatter, body] = match;
  const { scalars, maps } = parseFrontmatter(frontmatter);

  if (!scalars.version) throw new Error('AI-DECLARATION.md: `version` is required.');
  if (!scalars.level) throw new Error('AI-DECLARATION.md: `level` is required.');

  const declared = maps.processes ?? {};
  const processes = Object.fromEntries(
    PROCESSES.map((process) => [
      process,
      // "Any process not listed is assumed to be `none` implicitly."
      declared[process] ? assertLevel(declared[process], `processes.${process}`) : 'none',
    ]),
  ) as Record<Process, Level>;

  for (const process of Object.keys(declared)) {
    if (!(PROCESSES as readonly string[]).includes(process)) {
      throw new Error(`AI-DECLARATION.md: "${process}" is not a valid process.`);
    }
  }

  const components = Object.entries(maps.components ?? {}).map(([path, level]) => ({
    path,
    level: assertLevel(level, `components.${path}`),
  }));

  const level = assertLevel(scalars.level, 'level');
  const highest = [level, ...Object.values(processes), ...components.map((c) => c.level)].reduce(
    (a, b) => (LEVELS.indexOf(a) >= LEVELS.indexOf(b) ? a : b),
  );
  if (highest !== level) {
    throw new Error(
      `AI-DECLARATION.md: global level "${level}" must be the highest level present ("${highest}").`,
    );
  }

  const notesSection = body.split(/^##\s+Notes\s*$/m)[1];
  if (notesSection === undefined) throw new Error('AI-DECLARATION.md: missing `## Notes` section.');

  const notes = notesSection
    .split('\n')
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim());

  return { version: scalars.version, level, processes, components, notes, source: file };
}

export const declaration = parse(raw);

/** Renders the inline markdown the notes actually use: `code`, **bold**, links. */
export function inlineMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      '<a href="$2" rel="noopener">$1</a>',
    );
}
