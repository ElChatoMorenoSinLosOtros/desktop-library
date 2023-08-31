import { Module } from '@nestjs/common';
import PrismaModule from '@pr-prisma/prisma.module';
import PrismaService from '@pr-prisma/prisma.service';
import MaterialsController from './materials.controller';
import MaterialsService from './materials.service';

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService, PrismaService],
  imports: [PrismaModule]
})
export default class MaterialsModule {}
