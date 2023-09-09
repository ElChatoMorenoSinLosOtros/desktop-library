import FineModule from '@fine/fine.module';
import FineService from '@fine/fine.service';
import LoansModule from '@loans/loans.module';
import LoansService from '@loans/loans.service';
import MaterialsModule from '@materials/materials.module';
import MaterialsService from '@materials/materials.service';
import { Module } from '@nestjs/common';
import NotificationsModule from '@notifications/notifications.module';
import NotificationsService from '@notifications/notifications.service';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import ReserveModule from '@reserve/reserve.module';
import ReserveService from '@reserve/reserve.service';
import StartupService from './startup.service';

@Module({
  imports: [
    PrismaModule,
    MaterialsModule,
    FineModule,
    LoansModule,
    NotificationsModule,
    ReserveModule
  ],
  providers: [
    PrismaService,
    NotificationsService,
    LoansService,
    MaterialsService,
    FineService,
    StartupService,
    ReserveService
  ],
  exports: [StartupService]
})
export default class StartupModule {}
