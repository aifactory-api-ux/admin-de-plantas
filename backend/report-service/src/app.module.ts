import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ReportController } from './reports/report.controller';
import { ReportService } from './reports/report.service';
import { Report } from './reports/report.entity';
import { JwtStrategy } from './reports/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER || 'admin',
      password: process.env.POSTGRES_PASSWORD || 'adminpw',
      database: process.env.POSTGRES_DB || 'plantas',
      entities: [Report],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Report]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretjwtkey',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' },
    }),
  ],
  controllers: [ReportController],
  providers: [ReportService, JwtStrategy],
  exports: [ReportService],
})
export class AppModule {}