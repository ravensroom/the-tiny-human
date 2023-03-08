import type { Post, Author, Category } from '@/lib/types';
import { createClient } from 'next-sanity';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const queryProjectionForAuthor = `{
  _id,
  name
}`;

const queryProjectionForCategories = `{
  _id,
  title,
  slug
}`;

const queryProjectionForPost = `{
  _id,
  title,
  slug,
  author->${queryProjectionForAuthor},
  categories[]->${queryProjectionForCategories},
  publishedAt,
  body
} | order(publishedAt desc)`;

export async function getSlugs() {
  const posts = await getPosts();
  const slugs = posts.map((post) => post.slug.current);
  return slugs;
}

export async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] ${queryProjectionForPost}`;
  const post = await client.fetch<Post>(query, { slug });
  return post;
}

export async function getPosts() {
  return await client.fetch<Post[]>(`
    *[_type == "post"] ${queryProjectionForPost}`);
}

export async function getAuthors() {
  return await client.fetch<Author[]>(`
    *[_type == "author"] ${queryProjectionForAuthor}
  `);
}

export async function getCategories() {
  return await client.fetch<Category[]>(`
    *[_type == "category"] ${queryProjectionForCategories}
  `);
}
