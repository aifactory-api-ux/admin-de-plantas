import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async findAllByUserId(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({ where: { userId } });
  }

  async markAsRead(ids: number[], userId: number): Promise<boolean> {
    await this.notificationRepository.update(ids, { read: true });
    return true;
  }
}