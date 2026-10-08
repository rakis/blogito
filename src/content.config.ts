import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().default('Untitled'),
    date: z.coerce.date(),
    category: z.string(),
    draft: z.boolean().default(false),
    excerpt: z.string().optional(),
    layout: z.string().optional(),
  }),
});

export const collections = { posts };
