import { Module } from '@nestjs/common';
import AdminsModule from './admins/admins.module';
import AuthModule from './auth/auth.module';
import ClientsModule from './clients/clients.module';
import FineModule from './fine/fine.module';
import LoansModule from './loans/loans.module';
import MaterialsModule from './materials/materials.module';
import NotificationsModule from './notifications/notifications.module';
import OfficesModule from './offices/offices.module';
import PrismaModule from './prisma/prisma.module';
import ReserveModule from './reserve/reserve.module';
import ReturnsModule from './returns/returns.module';
import StartupModule from './startup/startup.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AdminsModule,
    MaterialsModule,
    ClientsModule,
    FineModule,
    LoansModule,
    OfficesModule,
    ReturnsModule,
    ReserveModule,
    NotificationsModule,
    StartupModule
  ]
})
export default class AppModule {}
