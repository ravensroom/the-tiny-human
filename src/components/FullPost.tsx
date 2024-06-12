import { Post } from "@/types/post";
import { Under } from "@/types/under";
import Link from "next/link";
import Markdown from "./Markdown";

export function FullPost({ under, post }: { under: Under; post: Post }) {
	return (
		<div className="flex flex-col gap-5">
			<Link href={`/${under}/${post.slug}`}>
				<h1 className="text-[#555555] text-2xl">{post.frontMatter.title}</h1>
			</Link>
			<Markdown markdown={post.markdownBody} />
		</div>
	);
}
