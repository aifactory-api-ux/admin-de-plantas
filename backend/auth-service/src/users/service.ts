import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userCreate: { username: string; email: string; password: string; role?: string }): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email: userCreate.email } });
    if (existing) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userCreate.password, 10);
    const user = this.userRepository.create({
      username: userCreate.username,
      email: userCreate.email,
      password: hashedPassword,
      role: userCreate.role || 'user',
    });

    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async validatePassword(userId: number, password: string): Promise<boolean> {
    const user = await this.findById(userId);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }

  async update(id: number, updateData: { role?: string }): Promise<User | null> {
    await this.userRepository.update(id, updateData);
    return this.findById(id);
  }
}