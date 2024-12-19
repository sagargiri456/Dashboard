import { getNotifications } from '@/app/actions';
import { Bell, Check } from 'lucide-react';

export default async function NotificationsPage() {
  const { success, notifications } = await getNotifications();

  return (
    <div className="flex flex-col rounded-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center text-2xl font-semibold">
          <Bell className="mr-2" /> Notifications
        </h1>
        <button className="flex items-center text-blue-600 hover:text-blue-800">
          Mark all as read <Check className="ml-1" />
        </button>
      </div>
      <div className="rounded-lg shadow">
        <ul className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <li key={notification.id} className="p-4 hover:bg-gray-50">
              <h3 className="text-lg font-medium text-gray-800">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-500">{notification.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
