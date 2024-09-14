interface Post {
    slug: string;
    data: {
        title: string;
        description: string;
        pubDate: Date;
        category: string;
    };
    render: () => Promise<{ Content: ComponentType }>;
}
