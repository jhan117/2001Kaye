const sortPostsByPubDate = (posts: Post[]): Post[] => {
    return posts.sort(
        (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
    );
};

export default sortPostsByPubDate;
