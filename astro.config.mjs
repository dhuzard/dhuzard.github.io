import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://dhuzard.github.io',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
  redirects: {
    '/posts': '/blog/',
    '/Blog': '/blog/',
    '/Blog/first-post': '/blog/2024-09-27-first-post/',
    '/Blog/AvailableToWork': '/blog/2024-10-08-availabletowork/',
    '/Blog/workaholism': '/blog/2024-10-08-workaholism/',
    '/Blog/LLMPower': '/blog/2024-10-09-llmpower/',
    '/Blog/SciComm-Webinar1-TEATIME': '/blog/2025-02-04-scicomm-webinar1-teatime/',
    '/Blog/LMT-Tribute': '/blog/2025-07-22-lmt-tribute/',
    '/Blog/Aujourdhui-maman-est-morte': '/blog/2025-08-26-aujourdhui-maman-est-morte/',
    '/Blog/teatime-conference-recap': '/blog/2025-09-05-teatime-conference-recap/',
    '/Blog/mbo-unified-language': '/blog/2025-09-10-mbo-unified-language/',
    '/Blog/metadata-reproducibility': '/blog/2025-09-11-metadata-reproducibility/',
    '/Blog/fairrr-ethics-of-metadata': '/blog/2025-09-18-fairrr-ethics-of-metadata/',
    '/Blog/fairrr-explained-metrics-outcomes': '/blog/2025-09-19-fairrr-explained-metrics-outcomes/',
    '/Blog/mapp-api-first-fairrr': '/blog/2025-09-20-mapp-api-first-fairrr/',
    '/Blog/case-study-hcm-mapp-ontology': '/blog/2025-09-21-case-study-hcm-mapp-ontology/',
    '/Blog/fairrr-playbook-30-days': '/blog/2025-09-22-fairrr-playbook-30-days/',
    '/hcm-app': '/projects/hcm-integrator/',
    '/hcm-explorer-page': '/projects/hcm-explorer/',
    '/hcm-ontology-mapper-page': '/projects/hcm-ontology-mapper/',
  },
});
