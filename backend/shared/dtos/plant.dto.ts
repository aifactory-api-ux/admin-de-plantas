export interface Plant {
  id: number;
  name: string;
  species: string;
  datePlanted: string;
  germinationStatus: 'pending' | 'germinated' | 'failed';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PlantCreate {
  name: string;
  species: string;
  datePlanted: string;
  notes?: string | null;
}

export interface PlantUpdate {
  name?: string;
  species?: string;
  datePlanted?: string;
  germinationStatus?: 'pending' | 'germinated' | 'failed';
  notes?: string | null;
}