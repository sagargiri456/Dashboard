import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const queries = await prisma.query.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(queries);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch queries' });
    }
  }

  if (method === 'PUT') {
    const { answer } = req.body;

    try {
      const updatedQuery = await prisma.query.update({
        where: { id: String(id) },
        data: { answer, status: 'answered' }
      });
      return res.status(200).json(updatedQuery);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update query' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
