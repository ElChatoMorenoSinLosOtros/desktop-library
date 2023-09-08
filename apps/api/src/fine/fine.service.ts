import PrismaService from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import CreateFineDto from './dto/create-fine.dto';
import UpdateFineDto from './dto/update-fine.dto';

@Injectable()
export default class FineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFineDto: CreateFineDto) {
    try {
      const existingFine = await this.prisma.fine.findFirst({
        where: { loanId: createFineDto.loanId }
      });
      if (!existingFine) {
        return await this.prisma.fine.create({
          data: createFineDto
        });
      }
      return null;
    } catch (error) {
      throw new Error('A fine with this loanId already exists');
    }
  }

  async createBatch(fines: CreateFineDto[]) {
    const finesData = fines.map(fine => ({
      debt: fine.debt,
      payeed: fine.payeed,
      loanId: fine.loanId,
      clientId: fine.clientId
    }));
    const fineTable = await this.prisma.fine.findMany();
    if (fineTable.length <= 0) {
      return this.prisma.fine.createMany({
        data: finesData
      });
    }
    return null;
  }

  async userTotalFine(clientId: number) {
    const userFines = await this.prisma.fine.findMany({
      where: { clientId }
    });

    if (!userFines) {
      throw new Error('User not found');
    }

    let totalFine = new Decimal(0.0);

    userFines.forEach(fine => {
      totalFine = totalFine.add(new Decimal(fine.debt));
    });

    return totalFine;
  }

  findAll() {
    return this.prisma.fine.findMany();
  }

  findOne(fineId: number) {
    return this.prisma.fine.findMany({
      where: { fineId }
    });
  }

  update(fineId: number, updateFineDto: UpdateFineDto) {
    return this.prisma.fine.update({
      where: { fineId },
      data: updateFineDto
    });
  }

  remove(fineId: number) {
    return this.prisma.fine.delete({
      where: { fineId }
    });
  }

  removeAll() {
    return this.prisma.fine.deleteMany();
  }
}
