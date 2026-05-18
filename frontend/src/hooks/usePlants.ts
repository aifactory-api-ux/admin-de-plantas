import { useState, useCallback } from 'react';
import { api } from '../lib/api';
import type { Plant, PlantCreate, PlantUpdate } from '../types/plant';

interface UsePlantsReturn {
  plants: Plant[];
  loading: boolean;
  error: string | null;
  fetchPlants: () => Promise<void>;
  createPlant: (data: PlantCreate) => Promise<Plant>;
  updatePlant: (id: number, data: PlantUpdate) => Promise<Plant>;
  deletePlant: (id: number) => Promise<void>;
  getPlant: (id: number) => Promise<Plant>;
}

export function usePlants(): UsePlantsReturn {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<Plant[]>('/api/plants');
      setPlants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch plants');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPlant = async (data: PlantCreate): Promise<Plant> => {
    setLoading(true);
    setError(null);
    try {
      const plant = await api.post<Plant>('/api/plants', data);
      setPlants(prev => [...prev, plant]);
      return plant;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create plant');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePlant = async (id: number, data: PlantUpdate): Promise<Plant> => {
    setLoading(true);
    setError(null);
    try {
      const plant = await api.patch<Plant>(`/api/plants/${id}`, data);
      setPlants(prev => prev.map(p => (p.id === id ? plant : p)));
      return plant;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update plant');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePlant = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/plants/${id}`);
      setPlants(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete plant');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPlant = async (id: number): Promise<Plant> => {
    return api.get<Plant>(`/api/plants/${id}`);
  };

  return { plants, loading, error, fetchPlants, createPlant, updatePlant, deletePlant, getPlant };
}