// /pages/api/uploaded-files.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db'; // Update this import with your actual Prisma client path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { files, uploadedBy } = req.body;
      console.log('I am inside the route.ts');
      // console.log(files[0][0])
      if (!files || !Array.isArray(files)) {
        return res.status(400).json({ message: 'Invalid data format' });
      }

      // Save files to the database
      const savedFiles = await prisma.uploadedFile.createMany({
        data: files.map((file: any) => ({
          name: file.name,
          url: file.url,
          size: file.size || 0, // Ensure a default value if not provided
          key: file.key || '', // Ensure a default value if not provided
          uploadedBy // Assuming you want to store `uploadedBy` for each file
        })),
        skipDuplicates: true // Optional: avoid inserting duplicate files
      });

      return res
        .status(200)
        .json({ message: 'Files uploaded successfully', savedFiles });
    } catch (error) {
      console.error('Error saving files:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
