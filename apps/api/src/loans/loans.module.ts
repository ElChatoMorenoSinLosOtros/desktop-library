import { Module } from '@nestjs/common';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import LoansController from './loans.controller';
import LoansService from './loans.service';

@Module({
  controllers: [LoansController],
  providers: [LoansService, PrismaService],
  imports: [PrismaModule]
})
export default class LoansModule {}
