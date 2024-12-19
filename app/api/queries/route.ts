import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db'; // Adjust path to your Prisma client

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'POST') {
    const { clientId, query } = req.body;

    try {
      const newQuery = await prisma.query.create({
        data: { clientId, query }
      });
      return res.status(201).json(newQuery);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create query' });
    }
  }

  if (method === 'GET') {
    const { clientId } = req.query;

    try {
      const queries = await prisma.query.findMany({
        where: { clientId: String(clientId) },
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(queries);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch queries' });
    }
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
