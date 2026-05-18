import { useState, useCallback } from 'react';
import { api } from '../lib/api';
import type { Report } from '../types/report';

interface UseReportsReturn {
  reports: Report[];
  loading: boolean;
  error: string | null;
  fetchReports: () => Promise<void>;
  generateReport: (type: 'germination-summary' | 'plant-status') => Promise<Report>;
}

export function useReports(): UseReportsReturn {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<Report[]>('/api/reports');
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateReport = async (type: 'germination-summary' | 'plant-status'): Promise<Report> => {
    setLoading(true);
    setError(null);
    try {
      const report = await api.post<Report>('/api/reports/generate', { type });
      setReports(prev => [...prev, report]);
      return report;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { reports, loading, error, fetchReports, generateReport };
}