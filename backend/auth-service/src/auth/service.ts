import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/service';
import { UserCreate } from '../../shared/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userCreate: UserCreate) {
    try {
      const user = await this.userService.create(userCreate);
      return user;
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await this.userService.validatePassword(user.id, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: 3600,
    };
  }

  async getProfile(userId: number) {
    return this.userService.findById(userId);
  }
}