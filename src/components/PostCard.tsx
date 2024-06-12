import { Post } from "@/types/post";
import { Under } from "@/types/under";
import { FullPost } from "./FullPost";
import Link from "next/link";

export function PostCard({ under, post }: { under: Under; post: Post }) {
	const trimmedPost: Post = {
		...post,
		markdownBody: post.markdownBody.slice(0, 500) + "...",
	};

	return (
		<>
			<FullPost under={under} post={trimmedPost} />
			<Link
				href={`/${under}/${post.slug}`}
				className="underline text-gray-500"
			>
				Full text &gt;&gt;
			</Link>
		</>
	);
}
