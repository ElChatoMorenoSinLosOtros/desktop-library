import { Module } from '@nestjs/common';
import AdminsModule from './admins/admins.module';
import AuthModule from './auth/auth.module';
import ClientsModule from './clients/clients.module';
import FineModule from './fine/fine.module';
import FineService from './fine/fine.service';
import LoansModule from './loans/loans.module';
import LoansService from './loans/loans.service';
import MaterialsModule from './materials/materials.module';
import MaterialsService from './materials/materials.service';
import NotificationsModule from './notifications/notifications.module';
import NotificationsService from './notifications/notifications.service';
import OfficesModule from './offices/offices.module';
import PrismaModule from './prisma/prisma.module';
import PrismaService from './prisma/prisma.service';
import ReserveModule from './reserve/reserve.module';
import ReturnsModule from './returns/returns.module';
import StartupService from './startup/startup.service';

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
    NotificationsModule
  ],
  providers: [
    PrismaService,
    NotificationsService,
    LoansService,
    MaterialsService,
    StartupService,
    FineService
  ]
})
export default class AppModule {}
