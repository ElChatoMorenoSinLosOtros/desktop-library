import { Injectable } from '@nestjs/common';
import PrismaService from '@pr-prisma/prisma.service';
import CreateLoanDto from './dto/create-loan.dto';
import UpdateLoanDto from './dto/update-loan.dto';

@Injectable()
export default class LoansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLoanDto: CreateLoanDto) {
    const loanData = {
      clientId: createLoanDto.clientId,
      materialId: createLoanDto.materialId,
      loanDate: createLoanDto.loanDate,
      returnDate: createLoanDto.returnDate,
      returned: createLoanDto.returned
    };

    const { materialId } = createLoanDto;

    const material = await this.prisma.material.findUnique({
      where: { materialId }
    });

    if (!material || material.quantity === 0) {
      throw new Error('Material not available');
    }

    const createdLoan = await this.prisma.loan.create({
      data: loanData
    });

    const newQuantity = material.quantity - 1;
    const materialUpdateData = {
      quantity: newQuantity,
      available: newQuantity > 0 ? material.available : false
    };

    await this.prisma.material.update({
      where: { materialId },
      data: materialUpdateData
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

  async getOverdueLoans() {
    const currentDate = new Date();

    return this.prisma.loan.findMany({
      where: {
        returnDate: {
          lt: currentDate
        },
        returned: false
      }
    });
  }
}
