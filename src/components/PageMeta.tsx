import { Post } from '@/lib/types';
import Link from 'next/link';

interface PostMetaProps {
  post: Post;
}

const PostMeta: React.FC<PostMetaProps> = ({ post }) => {
  return (
    <header className="mb-5">
      <div className="flex flex-col">
        <h1 className="text-2xl">{post.title}</h1>
        <Link href="/about" className="text-sm hover:underline">
          Author: {post.author?.name}
        </Link>
        <h2 className="text-sm">
          Published at: {post.publishedAt.slice(0, 16)}
        </h2>
        {post.categories?.length > 0 && (
          <div className="text-sm">
            <span>Categories: </span>
            <ul className="inline-flex gap-2">
              {post.categories.map((c) => (
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
  );
};

export default PostMeta;
