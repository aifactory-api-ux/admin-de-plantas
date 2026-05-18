import { useState, useCallback } from 'react';
import { api } from '../lib/api';
import type { Notification } from '../types/notification';

interface UseNotificationsReturn {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markRead: (ids: number[]) => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<Notification[]>('/api/notifications');
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const markRead = async (ids: number[]): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/api/notifications/mark-read', { ids });
      setNotifications(prev =>
        prev.map(n => (ids.includes(n.id) ? { ...n, read: true } : n))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark notifications as read');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { notifications, loading, error, fetchNotifications, markRead };
}