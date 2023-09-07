import AdminActions from '@admins/entities/AdminActions';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import PrismaService from '@pr-prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import AuthEntity from './entity/auth.entity';

@Injectable()
export default class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.admin.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      accessToken: this.jwtService.sign({ userId: user.adminId }),
      email: user.email,
      name: user.name,
      role: user.role,
      actions: JSON.parse(JSON.stringify(user.actions)) as AdminActions
    };
  }
}
