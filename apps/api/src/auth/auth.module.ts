import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import AdminsModule from 'src/admins/admins.module';
import AdminsService from 'src/admins/admins.service';
import PrismaModule from 'src/prisma/prisma.module';
import PrismaService from 'src/prisma/prisma.service';
import UsersModule from 'src/users/users.module';
import UsersService from 'src/users/users.service';
import AuthController from './auth.controller';
import AuthService from './auth.service';
// eslint-disable-next-line import/no-cycle
import JwtStrategy from './jwt.strategy';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' }
    }),
    AdminsModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    AdminsService,
    UsersService,
    AuthService,
    PrismaService,
    JwtStrategy
  ]
})
export default class AuthModule {}
