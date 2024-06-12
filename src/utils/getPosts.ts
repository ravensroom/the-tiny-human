import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Post, PostFrontMatter } from "@/types/post";
import { Under } from "@/types/under";

const contentsRootPath = path.join(process.cwd(), "public", "contents");

export async function getPostBySlug(slug: string, under: Under) {
	const source = await fs.readFile(path.join(contentsRootPath, under, `${slug}.md`), "utf-8");
	const { data, content } = matter(source);
	const post = {
		frontMatter: data as PostFrontMatter,
		markdownBody: content,
		slug,
	};
	return post;
}

export async function getPosts(under: Under): Promise<Post[]> {
	const postFileNames = await fs.readdir(path.join(contentsRootPath, under), "utf-8");
	const posts = await Promise.all(
		postFileNames.map(async (postFileName) => {
			const slug = postFileName.replace(".md", "");
			const post = await getPostBySlug(slug, under);
			return { ...post, slug };
		})
	);
	return posts;
}
