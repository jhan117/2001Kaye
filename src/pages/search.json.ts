import { getCollection } from 'astro:content';

export const prerender = true;

export const GET = async () => {
    const posts = await getCollection('posts');
    const isDev = import.meta.env.DEV;
    const visiblePosts = posts.filter((post) => isDev || !post.data.draft);
    
    const searchIndex = visiblePosts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        slug: post.slug,
        category: post.data.category || 'Uncategorized',
        tags: post.data.tags || [],
        pubDate: post.data.pubDate,
        body: post.body
    }));

    return new Response(JSON.stringify(searchIndex), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
