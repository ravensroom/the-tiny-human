import type { Post } from '@/lib/types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getPosts } from '@/lib/dataSource';
import { NextPage } from 'next';
import Paginator from '@/components/Paginator';

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
    revalidate: 2 * 60,
  };
};

interface TimelinePageProps {
  posts: Post[];
}

const POST_TITLES_PER_PAGE = 10;

const TimelinePage: NextPage<TimelinePageProps> = ({ posts }) => {
  let postIndexRange =
    posts.length < POST_TITLES_PER_PAGE
      ? [0, posts.length]
      : [0, POST_TITLES_PER_PAGE];
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
  const [currentPagePosts, setCurrentPagePosts] = useState<Post[]>(
    posts.slice(postIndexRange[0], postIndexRange[1])
  );

  const onPageChange = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    postIndexRange = [
      POST_TITLES_PER_PAGE * (pageIndex - 1),
      POST_TITLES_PER_PAGE * pageIndex,
    ];
    setCurrentPagePosts(posts.slice(postIndexRange[0], postIndexRange[1]));
    if (pageIndex === 1) {
      router.push('/timeline');
    } else {
      router.push(`/timeline?page=${pageIndex}`);
    }
  };

  return (
    <main className="flex h-full flex-col justify-between pb-5">
      {currentPagePosts.length > 0 && (
        <ul className="m-4 flex flex-col gap-2 text-gray-800">
          {currentPagePosts.map((post) => {
            return (
              <li key={post._id}>
                <Link
                  href={`/posts/${post.slug.current}`}
                  className="hover:underline"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">
                      {post.publishedAt.slice(5, 10)}
                    </span>
                    <span className="text-xl">{post.title}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <Paginator
        totalItems={posts.length}
        itemsPerPage={POST_TITLES_PER_PAGE}
        currentPageIndex={currentPageIndex}
        onPageChange={onPageChange}
      />
    </main>
  );
};

export default TimelinePage;
