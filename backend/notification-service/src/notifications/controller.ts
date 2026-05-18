import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationService } from './service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('api/notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Body() body: { userId: number }) {
    return this.notificationService.findAllByUserId(body.userId);
  }

  @Post('mark-read')
  async markRead(@Body() body: { ids: number[] }, @Body() bodyWithUser: { userId: number; ids: number[] }) {
    return { success: true };
  }
}