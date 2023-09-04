import { Injectable } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';
import CreateOfficeDto from './dto/create-office.dto';
import UpdateOfficeDto from './dto/update-office.dto';

@Injectable()
export default class OfficesService {
  constructor(private prisma: PrismaService) {}

  create(createOfficeDto: CreateOfficeDto) {
    return this.prisma.office.create({
      data: createOfficeDto
    });
  }

  findAll() {
    return this.prisma.office.findMany();
  }

  findOne(officeId: string) {
    return this.prisma.office.findUnique({
      where: { officeId }
    });
  }

  update(officeId: string, updateOfficeDto: UpdateOfficeDto) {
    return this.prisma.office.update({
      where: { officeId },
      data: updateOfficeDto
    });
  }

  remove(officeId: string) {
    return this.prisma.office.delete({
      where: { officeId }
    });
  }
}
