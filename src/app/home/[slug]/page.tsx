import { FullPost } from "@/components/FullPost";
import { Under } from "@/types/under";
import { getPostBySlug, getPosts } from "@/utils/getPosts";

export async function generateStaticParams() {
	const collections = await getPosts('home');
	return collections.map((collection) => ({
		slug: collection.slug,
	}));
}

export default async function Page({ params }: { params: { slug: string } }) {
	const collection = await getPostBySlug(params.slug, 'home');

	return collection ? (
		<FullPost key={collection.slug} under='home' post={collection} />
	) : (
		<div>404</div>
	);
}
