import { useState } from 'react';
import { useRouter } from 'next/router';
import type { Post } from '@/lib/types';
import { getPosts } from '@/lib/dataSource';
import { NextPage } from 'next';
import PostBrief from '@/components/PostBrief';
import Paginator from '@/components/Paginator';

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },

    revalidate: 2 * 60,
  };
}

interface HomePageProps {
  posts: Post[];
}

const POST_BRIEFS_PER_PAGE = 5;

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  let postIndexRange =
    posts.length < POST_BRIEFS_PER_PAGE
      ? [0, posts.length]
      : [0, POST_BRIEFS_PER_PAGE];
  const router = useRouter();
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
    if (pageIndex === 1) {
      router.push('/');
    } else {
      router.push(`/?page=${pageIndex}`);
    }
  };

  return (
    <main className="flex h-full flex-col justify-between pb-5">
      {currentPagePosts.length > 0 && (
        <ul className="m-4 flex flex-col gap-8">
          {currentPagePosts.map((post) => {
            return (
              <li key={post._id}>
                <PostBrief post={post} />
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
