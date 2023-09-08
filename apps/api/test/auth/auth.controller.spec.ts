import AdminsModule from '@admins/admins.module';
import AdminsService from '@admins/admins.service';
import AuthController from '@auth/auth.controller';
import AuthService from '@auth/auth.service';
import JwtStrategy from '@auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import { jwtConstants } from '@utils/constants';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
