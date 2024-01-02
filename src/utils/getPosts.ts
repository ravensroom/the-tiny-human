import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Post, PostFrontMatter } from "@/types/post";

const postsPath = path.join(process.cwd(), "public", "posts");

export async function getPostBySlug(slug: string) {
	const source = await fs.readFile(path.join(postsPath, `${slug}.md`), "utf8");
	const { data, content } = matter(source);
	const post = {
		frontMatter: data as PostFrontMatter,
		markdownBody: content,
		slug,
	};
	return post;
}

export async function getPosts(): Promise<Post[]> {
	const postFileNames = await fs.readdir(postsPath, "utf-8");
	const posts = await Promise.all(
		postFileNames.map(async (postFileName) => {
			const slug = postFileName.replace(".md", "");
			const post = await getPostBySlug(slug);
			return { ...post, slug };
		})
	);
	return posts;
}
