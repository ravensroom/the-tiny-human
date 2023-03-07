import { useState } from 'react';
import type { Post, Author, Category } from '@/lib/types';
import { getPosts, getAuthors, getCategories } from '@/lib/dataSource';
import { NextPage } from 'next';
import PostBrief from '@/components/PostBrief';
import Paginator from '@/components/Paginator';

export async function getStaticProps() {
  const posts = await getPosts();
  const authors = await getAuthors();
  const categories = await getCategories();

  return {
    props: {
      posts,
      authors,
      categories,
    },

    revalidate: 2 * 60,
  };
}

interface HomePageProps {
  posts: Post[];
  authors: Author[];
  categories: Category[];
}

const POST_BRIEFS_PER_PAGE = 5;

const HomePage: NextPage<HomePageProps> = ({ posts, authors, categories }) => {
  let postIndexRange =
    posts.length < POST_BRIEFS_PER_PAGE
      ? [0, posts.length]
      : [0, POST_BRIEFS_PER_PAGE];
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
  const [currentPagePosts, setCurrentPagePosts] = useState<Post[]>(
    posts.slice(postIndexRange[0], postIndexRange[1])
  );

  const onPageChange = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    postIndexRange = [
      POST_BRIEFS_PER_PAGE * (pageIndex - 1),
      POST_BRIEFS_PER_PAGE * pageIndex,
    ];
    setCurrentPagePosts(posts.slice(postIndexRange[0], postIndexRange[1]));
  };

  return (
    <main className="flex h-full flex-col justify-between pb-5">
      {currentPagePosts.length > 0 && (
        <ul className="m-4 flex flex-col gap-8">
          {currentPagePosts.map((post) => {
            const author = authors.find(
              (author) => author._id === post.author._ref
            ) as Author;
            const filteredCategories = post.categories.map((c) =>
              categories.find((cat) => cat._id === c._ref)
            ) as Category[];

            return (
              <li key={post._id}>
                <PostBrief
                  post={post}
                  postAuthor={author}
                  postCategories={filteredCategories}
                />
              </li>
            );
          })}
        </ul>
      )}
      <Paginator
        totalItems={posts.length}
        itemsPerPage={POST_BRIEFS_PER_PAGE}
        currentPageIndex={currentPageIndex}
        onPageChange={onPageChange}
      />
    </main>
  );
};

export default HomePage;
