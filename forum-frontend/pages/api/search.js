import { getPosts } from "@/lib/posts";

export default async (req, res) => {
    let posts = await getPosts();
    const results = posts.filter(
        ({ frontmatter: { title, excerpt, category } }) =>
            title.toLowerCase().indexOf(req.query.q) !== -1 ||
            excerpt.toLowerCase().indexOf(req.query.q) !== -1 ||
            category.toLowerCase().indexOf(req.query.q) !== -1
    );

    // res.status(200).json(JSON.stringify({ results }));
    return res.status(200).json({ results });
};
