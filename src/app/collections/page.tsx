import { PostCard } from "@/components/PostCard";
import { Under } from "@/types/under";
import { getPosts } from "@/utils/getPosts";

export default async function Page() {
	const collections = await getPosts('collections');
	return (
		<div className="flex flex-col gap-10">
			{collections.map((collection) => (
				<PostCard key={collection.slug} under='collections' post={collection} />
			))}
		</div>
	);
}
