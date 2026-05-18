import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PlantController } from './plants/plant.controller';
import { PlantService } from './plants/plant.service';
import { Plant } from './plants/plant.entity';
import { JwtStrategy } from './plants/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER || 'admin',
      password: process.env.POSTGRES_PASSWORD || 'adminpw',
      database: process.env.POSTGRES_DB || 'plantas',
      entities: [Plant],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Plant]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretjwtkey',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' },
    }),
  ],
  controllers: [PlantController],
  providers: [PlantService, JwtStrategy],
  exports: [PlantService],
})
export class AppModule {}