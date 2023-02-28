// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/sanityClient';
import type { Author } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Author[]>
) {
  const authors = await client.fetch(`
    *[_type == "author"] {
      _id,
      name
    }
  `);

  res.status(200).json(authors);
}
