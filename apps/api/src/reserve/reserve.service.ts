import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import PrismaService from '@pr-prisma/prisma.service';

import CreateReserveDto from './dto/create-reserve.dto';
import UpdateReserveDto from './dto/update-reserve.dto';

@Injectable()
export default class ReserveService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReserveDto: CreateReserveDto) {
    const { materialId, clientId } = createReserveDto;
    const material = await this.prisma.material.findUnique({
      where: { materialId }
    });
    const client = await this.prisma.client.findUnique({
      where: { clientId }
    });
    if (!client) {
      throw new HttpException('Client not available', HttpStatus.BAD_REQUEST);
    }
    if (!material) {
      throw new HttpException('Material not available', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.reserve.create({
      data: createReserveDto
    });
  }

  findAll() {
    return this.prisma.reserve.findMany();
  }

  findOne(reserveId: number) {
    return this.prisma.reserve.findUnique({
      where: { reserveId }
    });
  }

  async update(reserveId: number, updateReserveDto: UpdateReserveDto) {
    const { materialId, clientId } = updateReserveDto;
    const material = await this.prisma.material.findUnique({
      where: { materialId }
    });
    const client = await this.prisma.client.findUnique({
      where: { clientId }
    });
    if (!client) {
      throw new HttpException('Client not available', HttpStatus.BAD_REQUEST);
    }
    if (!material) {
      throw new HttpException('Material not available', HttpStatus.BAD_REQUEST);
    }
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

  async executeReserves() {
    const currentDate = new Date();
    const reserves = await this.prisma.reserve.findMany({
      where: {
        executed: false,
        executeDate: {
          lte: currentDate
        }
      }
    });

    if (reserves.length <= 0) {
      return;
    }

    reserves.forEach(async reserve => {
      try {
        await this.prisma.loan.create({
          data: {
            clientId: reserve.clientId,
            materialId: reserve.materialId,
            returnDate: reserve.returnDate
          }
        });
      } catch (error) {
        throw new Error(`Error creating loan for reserve `);
      }
    });

    reserves.map(async reserve => {
      try {
        await this.prisma.reserve.update({
          where: { reserveId: reserve.reserveId },
          data: { executed: true }
        });
      } catch (error) {
        throw new Error(`Error updating reserve ${reserve.reserveId}`);
      }
    });
  }
}
