import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async findAll(): Promise<Report[]> {
    return this.reportRepository.find();
  }

  async generate(type: 'germination-summary' | 'plant-status'): Promise<Report> {
    const title = type === 'germination-summary' ? 'Germination Summary Report' : 'Plant Status Report';
    const url = `http://localhost:23004/reports/${Date.now()}.pdf`;

    const report = this.reportRepository.create({
      title,
      type,
      url,
    });

    return this.reportRepository.save(report);
  }
}