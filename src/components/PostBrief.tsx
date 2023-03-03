import { PortableText } from '@portabletext/react';

import PortableTextComponents from '@/components/PortableTextComponents';
import Link from 'next/link';
import { PostPageProps } from '@/pages/posts/[slug]';

interface WithChilrenProps {
  children: React.ReactNode;
}

// const ShortText = ({ children }) => {
//   const maxChars = 200;
//   const text = children[0].text;
//   return <>{text.length > maxChars ? text.slice(0, maxChars) + '...' : text}</>;
// };

const BriefContainer: React.FC<WithChilrenProps> = ({ children }) => {
  return (
    <div style={{ maxHeight: '210px', overflow: 'hidden' }}>{children}</div>
  );
};

const PostComponent: React.FC<PostPageProps> = ({
  post,
  postAuthor,
  postCategories,
}) => {
  return (
    <>
      <article>
        <header className="mb-5">
          <div className="flex flex-col">
            <Link
              href={`/posts/${post.slug.current}`}
              className="text-2xl hover:underline"
            >
              {post.title}
            </Link>
            <Link href="/about" className="text-sm hover:underline">
              Author: {postAuthor?.name}
            </Link>
            <h2 className="text-sm">
              Published at: {post.publishedAt.slice(0, 16)}
            </h2>
            {postCategories?.length > 0 && (
              <div className="text-sm">
                <span>Categories: </span>
                <ul className="inline-flex gap-2">
                  {postCategories.map((c) => (
                    <li key={c?._id}>
                      {' '}
                      <Link
                        className="hover:underline"
                        href={`/categories/${c?.slug?.current}`}
                      >
                        {c?.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </header>
        <BriefContainer>
          <PortableText value={post.body} components={PortableTextComponents} />
        </BriefContainer>
      </article>
    </>
  );
};

export default PostComponent;
