import { defineCollection, z } from 'astro:content';

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    role: z.string(),
    org: z.string(),
    orgUrl: z.string().url().optional(),
    location: z.string().optional(),
    start: z.string(),
    end: z.string().optional(),
    current: z.boolean().default(false),
    kind: z.enum(['industry', 'academic', 'community']).default('academic'),
    summary: z.string().optional(),
    logo: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
  }),
});

const education = defineCollection({
  type: 'content',
  schema: z.object({
    degree: z.string(),
    org: z.string(),
    orgUrl: z.string().url().optional(),
    location: z.string().optional(),
    start: z.string(),
    end: z.string(),
    summary: z.string().optional(),
    gpa: z.string().optional(),
    order: z.number().optional(),
  }),
});

const papers = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    date: z.coerce.string().optional(),
    venue: z.string(),
    authors: z.array(z.string()),
    me: z.string().default('Huzard D'),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    pdf: z.string().optional(),
    preprint: z.boolean().default(false),
    equalContribution: z.array(z.string()).default([]),
    type: z.enum(['article', 'preprint', 'review', 'chapter']).default('article'),
    tags: z.array(z.string()).default([]),
  }),
});

const outputs = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    date: z.coerce.string(),
    type: z.enum(['other', 'software', 'protocol', 'roadmap', 'dataset', 'thesis']).default('other'),
    venue: z.string().optional(),
    authors: z.array(z.string()).default([]),
    dois: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    source: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const talks = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    date: z.coerce.string(),
    venue: z.string(),
    location: z.string().optional(),
    type: z.enum(['oral', 'invited', 'keynote', 'poster', 'webinar', 'short', 'participation']),
    slides: z.string().optional(),
    video: z.string().optional(),
    paper: z.string().optional(),
    abstract: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const awards = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    org: z.string(),
    date: z.coerce.string(),
    amount: z.string().optional(),
    url: z.string().url().optional(),
    description: z.string().optional(),
  }),
});

const press = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    outlet: z.string(),
    date: z.coerce.string(),
    type: z.enum(['article', 'podcast', 'tv', 'radio', 'magazine']).default('article'),
    url: z.string().url().optional(),
    language: z.string().default('en'),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['active', 'maintenance', 'archived']).default('active'),
    role: z.string().optional(),
    url: z.string().optional(),
    repo: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const students = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    level: z.string(),
    period: z.string(),
    topic: z.string(),
  }),
});

const responsibilities = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    org: z.string().optional(),
    url: z.string().url().optional(),
    period: z.string(),
  }),
});

export const collections = {
  experience,
  education,
  papers,
  outputs,
  talks,
  awards,
  press,
  projects,
  posts,
  students,
  responsibilities,
};
