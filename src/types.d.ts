interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
  };
  render: () => Promise<{ Content: ComponentType }>;
}
