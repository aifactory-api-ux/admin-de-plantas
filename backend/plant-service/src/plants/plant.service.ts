import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plant } from './plant.entity';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
  ) {}

  async findAll(): Promise<Plant[]> {
    return this.plantRepository.find();
  }

  async findOne(id: number): Promise<Plant> {
    const plant = await this.plantRepository.findOne({ where: { id } });
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }
    return plant;
  }

  async create(data: { name: string; species: string; datePlanted: string; notes?: string | null }): Promise<Plant> {
    const plant = this.plantRepository.create(data);
    return this.plantRepository.save(plant);
  }

  async update(id: number, data: { name?: string; species?: string; datePlanted?: string; germinationStatus?: string; notes?: string | null }): Promise<Plant> {
    const plant = await this.findOne(id);
    Object.assign(plant, data);
    return this.plantRepository.save(plant);
  }

  async remove(id: number): Promise<void> {
    const plant = await this.findOne(id);
    await this.plantRepository.remove(plant);
  }
}