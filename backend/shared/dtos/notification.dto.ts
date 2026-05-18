export interface Notification {
  id: number;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  read: boolean;
  createdAt: string;
}