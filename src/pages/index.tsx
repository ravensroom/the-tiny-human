import type { Post, Author, Category } from '@/lib/types';
import PostComponent from '@/components/PostComponent';

export async function getStaticProps() {
  const fetchPosts = await fetch('http://localhost:3000/api/posts');
  const posts = (await fetchPosts.json()) as Post[];

  const fetchAuthors = await fetch('http://localhost:3000/api/authors');
  const authors = (await fetchAuthors.json()) as Post[];

  const fetchCategories = await fetch('http://localhost:3000/api/categories');
  const categories = (await fetchCategories.json()) as Post[];

  return {
    props: {
      posts,
      authors,
      categories,
    },
  };
}

type HomePageProps = {
  posts: Post[];
  authors: Author[];
  categories: Category[];
};

const HomePage: React.FC<HomePageProps> = ({ posts, authors, categories }) => {
  return (
    <main>
      {posts.length > 0 && (
        <ul className="m-2 flex flex-col gap-8">
          {posts.map((post) => {
            const author = authors.find(
              (author) => author._id === post.author._ref
            );
            const filteredCategories = post.categories.map((c) =>
              categories.find((cat) => cat._id === c._ref)
            );

            return (
              <li key={post._id}>
                <PostComponent
                  post={post}
                  author={author}
                  categories={filteredCategories}
                />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default HomePage;
