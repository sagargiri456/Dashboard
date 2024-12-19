'use client';

import React, { useState } from 'react';
import { createNotification } from '@/app/actions';

const NotificationPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (icon) formData.append('icon', icon);

      const result = await createNotification(formData);
      console.log(result);
      setMessage(result.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to create notification.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md border-2 p-4">
      <h1 className="mb-4 text-xl font-bold">Create Notification</h1>
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Notification Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Notification Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="icon" className="block text-sm font-medium">
            Notification Icon
          </label>
          <input
            id="icon"
            type="file"
            accept="image/*"
            onChange={(e) => setIcon(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Create Notification'}
        </button>
      </form>
    </div>
  );
};

export default NotificationPage;
