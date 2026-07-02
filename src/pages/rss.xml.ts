import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { Post } from '@types';
import { sortPostsByPubDate } from '@utils/posts';

export const prerender = true;

export async function GET(context: any) {
    const posts = await getCollection('posts');
    const sortedPosts = sortPostsByPubDate(posts as Post[]);

    return rss({
        title: '2001Kaye 기술 블로그',
        description: '기록하며 성장하는 프론트엔드/백엔드 개발 블로그',
        site: context.site || 'http://localhost:4321', // 기본 주소 혹은 astro.config 설정
        items: sortedPosts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/posts/${post.slug}/`,
        })),
        customData: `<language>ko-kr</language>`,
    });
}
