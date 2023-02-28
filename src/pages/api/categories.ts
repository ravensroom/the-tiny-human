// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/sanityClient';
import type { Catogory } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Catogory[]>
) {
  const categories = await client.fetch(`
    *[_type == "category"] {
      _id,
      title
    }
  `);

  res.status(200).json(categories);
}
