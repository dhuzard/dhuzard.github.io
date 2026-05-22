import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '~/site.config';

export async function GET(context: { site?: URL }) {
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.excerpt ?? '',
      link: `/blog/${p.slug}/`,
    })),
  });
}
