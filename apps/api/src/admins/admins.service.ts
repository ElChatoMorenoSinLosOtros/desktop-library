import { Injectable } from '@nestjs/common';
import PrismaService from '@pr-prisma/prisma.service';
import constants from '@utils/constants';
import * as bcrypt from 'bcrypt';
import CreateAdminDto from './dto/create-admin.dto';
import UpdateAdminDto from './dto/update-admin.dto';

@Injectable()
export default class AdminsService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(
      createAdminDto.password,
      constants.roundsOfHashing
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
    const admin = await this.prisma.admin.findUnique({
      where: { adminId }
    });

    let hashedPassword = admin.password;
    if (updateAdminDto.password && updateAdminDto.password !== '') {
      hashedPassword = await bcrypt.hash(
        updateAdminDto.password,
        constants.roundsOfHashing
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
