import { Module } from '@nestjs/common';
import AdminsModule from './admins/admins.module';
import AuthModule from './auth/auth.module';
import ClientsModule from './clients/clients.module';
import LoansModule from './loans/loans.module';
import MaterialsModule from './materials/materials.module';
import PrismaModule from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AdminsModule,
    MaterialsModule,
    ClientsModule,
    LoansModule
  ]
})
export default class AppModule {}
