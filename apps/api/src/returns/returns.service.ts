import { Injectable } from '@nestjs/common';
import PrismaService from '@pr-prisma/prisma.service';
import CreateReturnDto from './dto/create-return.dto';
import UpdateReturnDto from './dto/update-return.dto';

@Injectable()
export default class ReturnsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReturnDto: CreateReturnDto) {
    const returnData = {
      loanId: createReturnDto.loanId,
      returnDate: createReturnDto.returnDate
    };
    const { loanId } = createReturnDto;
    const loan = await this.prisma.loan.findUnique({
      where: { loanId }
    });
    if (!loan) {
      throw new Error('Loan not found');
    }
    const loanUpdateData = {
      returned: true
    };
    await this.prisma.loan.update({
      where: { loanId },
      data: loanUpdateData
    });

    const { materialId } = loan;

    const material = await this.prisma.material.findUnique({
      where: { materialId }
    });
    if (!material) {
      throw new Error('Material not found');
    }
    const newQuantity = material.quantity + 1;
    const materialUpdateData = {
      quantity: newQuantity,
      available: newQuantity > 0
    };
    await this.prisma.material.update({
      where: { materialId },
      data: materialUpdateData
    });

    const createdReturn = await this.prisma.return.create({
      data: returnData
    });
    return createdReturn;
  }

  findAll() {
    return this.prisma.return.findMany();
  }

  findOne(loanId: number) {
    return this.prisma.return.findMany({
      where: { loanId }
    });
  }

  update(returnId: number, updateReturnDto: UpdateReturnDto) {
    return this.prisma.return.update({
      where: { returnId },
      data: updateReturnDto
    });
  }

  remove(returnId: number) {
    return this.prisma.return.delete({
      where: { returnId }
    });
  }
}
