import { FullPost } from "@/components/FullPost";
import { getPostBySlug, getPosts } from "@/utils/getPosts";

export async function generateStaticParams() {
	const collections = await getPosts();
	return collections.map((collection) => ({
		slug: collection.slug,
	}));
}

export default async function Page({ params }: { params: { slug: string } }) {
	const collection = await getPostBySlug(params.slug);

	return collection ? (
		<FullPost key={collection.slug} under="/collection" post={collection} />
	) : (
		<div>404</div>
	);
}
