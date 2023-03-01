import { Post, Author, Category } from '@/lib/types';
import { PortableText } from '@portabletext/react';

import PortableTextComponents from '@/components/PortableTextComponents';

interface PostProps {
  post: Post;
  author: Author | undefined;
  categories: (Category | undefined)[];
}

const PostComponent: React.FC<PostProps> = ({ post, author, categories }) => {
  return (
    <>
      <article>
        <header className="mb-5">
          <h1 className="text-2xl">{post.title}</h1>
          <h2 className="text-sm">Author: {author?.name}</h2>
          {categories?.length > 0 && (
            <div className="text-sm">
              <span>Categories: </span>
              <ul className="inline-flex gap-2">
                {categories.map((c) => (
                  <li key={c?._id}> {c?.title}</li>
                ))}
              </ul>
            </div>
          )}
        </header>
        <PortableText value={post.body} components={PortableTextComponents} />
      </article>
    </>
  );
};

export default PostComponent;
