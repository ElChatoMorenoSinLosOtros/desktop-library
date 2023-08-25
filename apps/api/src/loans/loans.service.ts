import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import CreateLoanDto from './dto/create-loan.dto';
import UpdateLoanDto from './dto/update-loan.dto';

@Injectable()
export default class LoansService {
  constructor(private readonly prisma: PrismaService) {}

  async createLoan(createLoanDto: CreateLoanDto) {
    const { adminID, ...loanData } = createLoanDto;

    const createdLoan = await this.prisma.loan.create({
      data: {
        ...loanData,
        admin: {
          connect: { adminId: adminID }
        }
      },
      include: {
        admin: true, // Include the admin in the created loan response
        client: true, // Include the client if needed
        material: true // Include the material if needed
      }
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
