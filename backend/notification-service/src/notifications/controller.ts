import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationService } from './service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('api/notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  async findAll(@Body() body: { userId: number }) {
    return this.notificationService.findAllByUserId(body.userId);
  }

  @Post('mark-read')
  async markRead(@Body() body: { ids: number[] }, @Body() bodyWithUser: { userId: number; ids: number[] }) {
    return { success: true };
  }
}