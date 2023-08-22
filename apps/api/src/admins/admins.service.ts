import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import CreateAdminDto from './dto/create-admin.dto';
import UpdateAdminDto from './dto/update-admin.dto';

@Injectable()
export default class AdminsService {
  constructor(private prisma: PrismaService) {}

  create(createAdminDto: CreateAdminDto) {
    return this.prisma.admins.create({
      data: createAdminDto
    });
  }

  findAll() {
    return this.prisma.admins.findMany();
  }

  findOne(id: number) {
    return this.prisma.admins.findMany({
      where: { id }
    });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.prisma.admins.update({
      where: { id },
      data: updateAdminDto
    });
  }

  remove(id: number) {
    return this.prisma.admins.delete({
      where: { id }
    });
  }
}
