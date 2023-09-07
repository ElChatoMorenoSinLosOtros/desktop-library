import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import PrismaService from '@/prisma/prisma.service';
import CreateFineDto from './dto/create-fine.dto';
import UpdateFineDto from './dto/update-fine.dto';

@Injectable()
export default class FineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFineDto: CreateFineDto) {
    const fineData = {
      debt: createFineDto.debt,
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

  async verifyUsersFine() {
    const userLoans = await this.prisma.loan.findMany();

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (userLoans.length <= 0) {
      throw new Error('No Loans Found');
    }

    userLoans.forEach(async loan => {
      loan.returnDate.setHours(0, 0, 0, 0);
      if (loan.returnDate <= currentDate && loan.returned === false) {
        try {
          await this.prisma.fine.upsert({
            where: { loanId: loan.loanId },
            create: {
              debt: 75.5,
              payeed: false,
              loanId: loan.loanId,
              clientId: loan.clientId
            },
            update: {}
          });
        } catch (error) {
          throw new Error(`Error creating fine for loan ID`);
        }
      }
    });
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
}
