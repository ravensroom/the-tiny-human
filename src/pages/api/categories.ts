// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/sanityClient';
import type { Category } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[]>
) {
  const categories = await client.fetch(`
    *[_type == "category"] {
      _id,
      title
    }
  `);

  res.status(200).json(categories);
}
