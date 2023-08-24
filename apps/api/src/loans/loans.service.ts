import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import CreateLoanDto from './dto/create-loan.dto';
import UpdateLoanDto from './dto/update-loan.dto';
import LoanEntity from './entities/loan.entity';

@Injectable()
export default class LoansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    clientId: number,
    createLoanDto: CreateLoanDto
  ): Promise<LoanEntity> {
    const { materialId, loanDate, returnDate } = createLoanDto;
    const material = await this.prisma.material.findUnique({
      where: { materialId }
    });
    if (!material || material.quantity <= 0) {
      throw new Error('Material not available');
    }
    const loanData: CreateLoanDto = {
      clientId,
      materialId,
      loanDate,
      returnDate
    };

    await this.prisma.material.update({
      where: { materialId },
      data: {
        quantity: material.quantity - 1
      }
    });

    const createdLoan = await this.prisma.loan.create({
      data: loanData
    });
    return createdLoan;
  }

  findAll() {
    return this.prisma.loan.findMany();
  }

  findOne(loanId: number) {
    return this.prisma.loan.findMany({
      where: { loanId }
    });
  }

  update(loanId: number, updateLoanDto: UpdateLoanDto) {
    return this.prisma.loan.update({
      where: { loanId },
      data: updateLoanDto
    });
  }

  remove(loanId: number) {
    return this.prisma.loan.delete({
      where: { loanId }
    });
  }
}
