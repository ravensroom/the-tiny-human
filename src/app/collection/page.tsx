import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/utils/getPosts";

export default async function Page() {
	const collections = await getPosts();
	return (
		<div className="flex flex-col gap-10">
			{collections.map((collection) => (
				<PostCard key={collection.slug} under="/collection" post={collection} />
			))}
		</div>
	);
}
