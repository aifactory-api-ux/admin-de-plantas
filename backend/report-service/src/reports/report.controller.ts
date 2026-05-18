import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('api/reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  async findAll() {
    return this.reportService.findAll();
  }

  @Post('generate')
  async generate(@Body() body: { type: 'germination-summary' | 'plant-status' }) {
    return this.reportService.generate(body.type);
  }
}