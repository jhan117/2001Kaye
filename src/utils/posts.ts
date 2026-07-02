import type { Post } from "@types";

export const sortPostsByPubDate = (posts: Post[]): Post[] => {
    // 개발 환경에서는 초안(Draft)을 포함하고, 배포 환경에서는 제외합니다.
    const isDev = import.meta.env.DEV;
    const visiblePosts = posts.filter(post => isDev || !post.data.draft);
    
    return visiblePosts.sort(
        (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
    );
};

export const getCategories = (posts: Post[]) => {
    const isDev = import.meta.env.DEV;
    const visiblePosts = posts.filter(post => isDev || !post.data.draft);
    
    const categoryCounts = visiblePosts.reduce((acc, post) => {
        const cat = post.data.category || "Uncategorized";
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        count,
    }));
};

export const getTags = (posts: Post[]) => {
    const isDev = import.meta.env.DEV;
    const visiblePosts = posts.filter(post => isDev || !post.data.draft);
    
    const tagCounts = visiblePosts.reduce((acc, post) => {
        const tags = post.data.tags || [];
        tags.forEach((tag: string) => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCounts).map(([name, count]) => ({
        name,
        count,
    }));
};

export const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200;
    const cleanContent = content.replace(/<[^>]*>?/gm, ''); // HTML 태그 제거
    const words = cleanContent.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
};
