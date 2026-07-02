import { defineCollection, z } from "astro:content";

const posts = defineCollection({
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        description: z.string().optional().default(""),
        category: z.string().optional().default("Uncategorized"),
        tags: z.array(z.string()).optional().default([]),
        image: z.string().optional(),
        draft: z.boolean().optional().default(false),
    }),
});

export const collections = { posts };
