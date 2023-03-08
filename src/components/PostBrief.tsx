import { PortableText } from '@portabletext/react';

import PortableTextComponents from '@/components/PortableTextComponents';
import Link from 'next/link';
import PostMeta from './PageMeta';
import { Post } from '@/lib/types';

interface PostBriefProps {
  post: Post;
}

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

const PostBrief: React.FC<PostBriefProps> = ({ post }) => {
  return (
    <>
      <article>
        <PostMeta post={post} />
        <BriefContainer>
          <PortableText value={post.body} components={PortableTextComponents} />
        </BriefContainer>
      </article>
    </>
  );
};

export default PostBrief;
