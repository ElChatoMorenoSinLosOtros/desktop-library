import { Injectable } from '@nestjs/common';
import PrismaService from '@pr-prisma/prisma.service';

import CreateReserveDto from './dto/create-reserve.dto';
import UpdateReserveDto from './dto/update-reserve.dto';

@Injectable()
export default class ReserveService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReserveDto: CreateReserveDto) {
    const reserveData = {
      clientId: createReserveDto.clientId,
      materialId: createReserveDto.materialId,
      checkDate: createReserveDto.checkDate,
      returnDate: createReserveDto.returnDate,
      returned: createReserveDto.returned
    };
    const createdReserve = await this.prisma.reserve.create({
      data: reserveData
    });
    return createdReserve;
  }

  findAll() {
    return this.prisma.reserve.findMany();
  }

  findOne(reserveId: number) {
    return this.prisma.reserve.findUnique({
      where: { reserveId }
    });
  }

  update(reserveId: number, updateReserveDto: UpdateReserveDto) {
    return this.prisma.reserve.update({
      where: { reserveId },
      data: updateReserveDto
    });
  }

  remove(reserveId: number) {
    return this.prisma.reserve.delete({
      where: { reserveId }
    });
  }
}
