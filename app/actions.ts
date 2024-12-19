'use server';

import prisma from '@/lib/db'; // Adjust the path to your Prisma client

export async function createNotification(data: FormData) {
  try {
    const title = data.get('title') as string | null;
    const description = data.get('description') as string | null;
    const icon = data.get('icon') as File | null; // Or handle file storage elsewhere

    if (!title || !description) {
      throw new Error('Title and description are required.');
    }

    // Save the notification in the database using Prisma
    const notification = await prisma.notification.create({
      data: {
        title: title,
        message: description
      }
    });

    console.log('Notification created:', notification);

    return {
      success: true,
      message: 'Notification created successfully!'
    };
  } catch (error) {
    console.error('Error creating notification:', error);
    return {
      success: false,
      message: 'Failed to create notification.'
    };
  }
}
export async function getNotifications() {
  try {
    const notifications = await prisma.notification.findMany({});
    return { success: true, notifications };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { success: false, notifications: [] };
  }
}

export async function saveUploadedFile(fileData: {
  name: string;
  url: string;
  type: string;
  size: number;
  fileHash: string;
  key: string;
  appUrl: string;
  uploadedBy: string;
}) {
  try {
    const savedFile = await prisma.uploadedFile.create({
      data: {
        name: fileData.name,
        url: fileData.url,
        type: fileData.type,
        size: fileData.size,
        fileHash: fileData.fileHash,
        key: fileData.key,
        appUrl: fileData.appUrl,
        uploadedBy: fileData.uploadedBy
      }
    });
    return savedFile;
  } catch (error) {
    console.error('Error saving file to database:', error);
    throw new Error('Failed to save file');
  }
}
