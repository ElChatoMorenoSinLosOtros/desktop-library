import AdminsModule from '@admins/admins.module';
import AdminsService from '@admins/admins.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import { jwtConstants } from '@utils/constants';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import JwtStrategy from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24hr' }
    }),
    AdminsModule
  ],
  controllers: [AuthController],
  providers: [AdminsService, AuthService, PrismaService, JwtStrategy]
})
export default class AuthModule {}
