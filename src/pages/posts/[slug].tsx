import PostMeta from '@/components/PageMeta';
import { getPost, getSlugs } from '@/lib/dataSource';
import { Post } from '@/lib/types';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { PortableText } from '@portabletext/react';

import PortableTextComponents from '@/components/PortableTextComponents';

interface Params extends ParsedUrlQuery {
  slug: string;
}

export interface PostPageProps {
  post: Post;
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
  return {
    props: { post },
    revalidate: 2 * 60,
  };
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  return (
    <div className="m-8">
      <article>
        <PostMeta post={post} />
      </article>
      <PortableText value={post.body} components={PortableTextComponents} />
    </div>
  );
};

export default PostPage;
