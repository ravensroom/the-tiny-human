import PostComponent from '@/components/PostComponent';
import {
  getAuthors,
  getPost,
  getPostAuthor,
  getPostCategories,
  getSlugs,
} from '@/lib/dataSource';
import { Author, Category, Post } from '@/lib/types';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next/types';
import { ParsedUrlQuery } from 'querystring';

interface Params extends ParsedUrlQuery {
  slug: string;
}

export interface PostPageProps {
  post: Post;
  postAuthor: Author;
  postCategories: Category[];
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const slugs = await getSlugs();
  return {
    // will be available in getStaticProps
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    // what to do if no path for params. set false will result in a 404 not found page
    fallback: false,
  };
};

// only called by the server to send props to this page
export const getStaticProps: GetStaticProps<PostPageProps, Params> = async (
  context: GetStaticPropsContext<Params>
) => {
  const { slug } = context.params!;
  const post = (await getPost(slug)) as Post;
  const postAuthor = await getPostAuthor(post);
  const postCategories = await getPostCategories(post);
  return {
    props: { post, postAuthor, postCategories },
    revalidate: 2 * 60,
  };
};

const PostPage: NextPage<PostPageProps> = (props) => {
  return (
    <div className="m-8">
      <PostComponent {...props} />
    </div>
  );
};

export default PostPage;
