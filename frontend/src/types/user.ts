export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}