import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import AdminsModule from 'src/admins/admins.module';
import AdminsService from 'src/admins/admins.service';
import PrismaModule from 'src/prisma/prisma.module';
import PrismaService from 'src/prisma/prisma.service';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import jwtConstants from './constants';
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
