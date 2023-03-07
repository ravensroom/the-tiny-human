import type { Post, Author, Category } from '@/lib/types';
import client from '@/lib/sanityClient';

export async function getSlugs() {
  const posts = await getPosts();
  const slugs = posts.map((post) => post.slug.current);
  return slugs;
}

export async function getPost(slug: string) {
  const posts = await getPosts();
  return posts.find((post) => post.slug.current === slug);
}

export async function getPostAuthor(post: Post) {
  const authors = await getAuthors();
  return authors.find((author) => author._id === post.author._ref);
}

export async function getPostCategories(post: Post) {
  const categories = await getCategories();
  return post.categories.map((c) =>
    categories.find((cat) => cat._id === c._ref)
  );
}

export async function getPosts() {
  return await client.fetch<Post[]>(`
    *[_type == "post"] {
      _id,
      title,
      slug,
      author,
      categories,
      publishedAt,
      body
    }
  `);
}
export async function getAuthors() {
  return await client.fetch<Author[]>(`
    *[_type == "author"] {
      _id,
      name
    }
  `);
}
export async function getCategories() {
  return await client.fetch<Category[]>(`
    *[_type == "category"] {
      _id,
      title
    }
  `);
}
