import { z } from 'zod';

export const notificationSchema = z.object({
  title: z.string(),
  description: z.string()
});
