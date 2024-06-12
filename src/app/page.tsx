import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/utils/getPosts";

export default async function Home() {
	const posts = await getPosts('home');
	return (
		<div className="flex flex-col gap-10">
			{posts.map((post) => (
				<PostCard key={post.slug} under='home' post={post} />
			))}
		</div>
	);
}
