// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/sanityClient';
import type { Post } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  const posts = await client.fetch(`
    *[_type == "post"] {
      _id,
      title,
      slug,
      author,
      categories,
      publishedAt,
      body
    }
  `);

  res.status(200).json(posts);
}
