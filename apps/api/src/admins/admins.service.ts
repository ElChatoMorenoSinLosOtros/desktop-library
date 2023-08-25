import { Injectable } from '@nestjs/common';
import PrismaService from '@pr-prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import CreateAdminDto from './dto/create-admin.dto';
import UpdateAdminDto from './dto/update-admin.dto';

export const roundsOfHashing = 10;

@Injectable()
export default class AdminsService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(
      createAdminDto.password,
      roundsOfHashing
    );
    const adminData = {
      ...createAdminDto,
      password: hashedPassword
    };
    return this.prisma.admin.create({
      data: adminData
    });
  }

  findAll() {
    return this.prisma.admin.findMany();
  }

  findOne(adminId: number) {
    return this.prisma.admin.findMany({
      where: { adminId }
    });
  }

  async update(adminId: number, updateAdminDto: UpdateAdminDto) {
    let hashedPassword = '';
    if (updateAdminDto.password) {
      hashedPassword = await bcrypt.hash(
        updateAdminDto.password,
        roundsOfHashing
      );
    }
    const updateAdminData = {
      ...updateAdminDto,
      password: hashedPassword
    };
    return this.prisma.admin.update({
      where: { adminId },
      data: updateAdminData
    });
  }

  remove(adminId: number) {
    return this.prisma.admin.delete({
      where: { adminId }
    });
  }
}
