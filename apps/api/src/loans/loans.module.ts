import { Module } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import LoansController from './loans.controller';
import LoansService from './loans.service';

@Module({
  controllers: [LoansController],
  providers: [LoansService, PrismaService]
})
export default class LoansModule {}
