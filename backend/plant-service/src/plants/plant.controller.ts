import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlantService } from './plant.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('api/plants')
export class PlantController {
  constructor(private plantService: PlantService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.plantService.findAll();
  }

  @Post()
  async create(@Body() body: { name: string; species: string; datePlanted: string; notes?: string }) {
    return this.plantService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.plantService.findOne(parseInt(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { name?: string; species?: string; datePlanted?: string; germinationStatus?: string; notes?: string | null }) {
    return this.plantService.update(parseInt(id), body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.plantService.remove(parseInt(id));
    return { success: true };
  }
}