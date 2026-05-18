import { useState } from 'react';
import { api } from '../lib/api';
import type { AuthToken } from '../types/auth';
import type { User, UserCreate } from '../types/user';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: UserCreate) => Promise<void>;
  fetchMe: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<AuthToken>('/api/auth/login', { username, password });
      localStorage.setItem('token', response.accessToken);
      await fetchMe();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (data: UserCreate) => {
    setLoading(true);
    setError(null);
    try {
      await api.post<User>('/api/auth/register', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchMe = async () => {
    try {
      const userData = await api.get<User>('/api/auth/me');
      setUser(userData);
    } catch {
      setUser(null);
    }
  };

  return { user, loading, error, login, logout, register, fetchMe };
}