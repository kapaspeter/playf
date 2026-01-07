import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pagesCollection = defineCollection({
  loader: glob({ 
    pattern: '**/*.md', 
    base: './src/content/pages',
    generateId: ({ entry, base, data }) => {
      // entry is the relative path from base, e.g. "en/home.md"
      return entry.replace(/\.md$/, '');
    }
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    MetaKeywords: z.string().optional(),
    MetaDescription: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'pages': pagesCollection,
};
