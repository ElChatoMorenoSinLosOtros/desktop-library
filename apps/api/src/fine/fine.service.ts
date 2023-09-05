import PrismaService from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import CreateFineDto from './dto/create-fine.dto';
import UpdateFineDto from './dto/update-fine.dto';

@Injectable()
export default class FineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFineDto: CreateFineDto) {
    const fineData = {
      debt: createFineDto.debt,
      createDate: createFineDto.createDate,
      payeed: createFineDto.payeed,
      loanId: createFineDto.loanId,
      clientId: createFineDto.clientId
    };

    const { loanId } = createFineDto;

    const loan = this.prisma.loan.findUnique({
      where: { loanId }
    });

    if (!loan) {
      throw new Error('Loan not available');
    }

    const createdFine = await this.prisma.fine.create({
      data: fineData
    });

    return createdFine;
  }

  async verifyUserFine(clientId: number) {
    const userLoans = await this.prisma.loan.findMany({
      where: { clientId }
    });

    const currentDate = new Date();

    userLoans.forEach(async loan => {
      if (loan.loanDate <= currentDate) {
        await this.create({
          debt: 10,
          createDate: currentDate,
          payeed: false,
          loanId: loan.loanId,
          clientId
        });
      }
    });

    const userFines = await this.prisma.fine.findMany({
      where: { clientId, payeed: false }
    });

    let totalDebt = 0;

    userFines.forEach(async fine => {
      const daysPassed = Math.floor(
        (currentDate.getTime() - fine.createDate.getTime()) / (1000 * 3600 * 24)
      );
      totalDebt += daysPassed * 2;
      await this.prisma.fine.update({
        where: { fineId: fine.fineId },
        data: { debt: daysPassed * 2 }
      });
    });

    return totalDebt;
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
}
