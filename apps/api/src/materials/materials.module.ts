import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import PrismaService from 'src/prisma/prisma.service';
import MaterialsController from './materials.controller';
import MaterialsService from './materials.service';

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService, PrismaService],
  imports: [PrismaModule]
})
export default class MaterialsModule {}