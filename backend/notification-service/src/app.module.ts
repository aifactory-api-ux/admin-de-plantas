import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { NotificationController } from './notifications/controller';
import { NotificationService } from './notifications/service';
import { Notification } from './notifications/notification.entity';
import { JwtStrategy } from './notifications/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER || 'admin',
      password: process.env.POSTGRES_PASSWORD || 'adminpw',
      database: process.env.POSTGRES_DB || 'plantas',
      entities: [Notification],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Notification]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretjwtkey',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' },
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, JwtStrategy],
  exports: [NotificationService],
})
export class AppModule {}