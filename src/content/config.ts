import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const portfolioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    coverImage: z.string().optional(),
    category: z.string().default('其他'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  portfolio: portfolioCollection,
};