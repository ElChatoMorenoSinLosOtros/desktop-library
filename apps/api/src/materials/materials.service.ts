import { Injectable } from '@nestjs/common';
import PrismaService from '@pr-prisma/prisma.service';
import CreateMaterialDto from './dto/create-material.dto';
import UpdateMaterialDto from './dto/update-material.dto';

@Injectable()
class MaterialsService {
  constructor(private prisma: PrismaService) {}

  create(createMaterialDto: CreateMaterialDto) {
    return this.prisma.material.create({
      data: { ...createMaterialDto, available: true }
    });
  }

  findAll() {
    return this.prisma.material.findMany();
  }

  findOne(materialId: number) {
    return this.prisma.material.findUnique({ where: { materialId } });
  }

  update(materialId: number, updateMaterialDto: UpdateMaterialDto) {
    return this.prisma.material.update({
      where: { materialId },
      data: updateMaterialDto
    });
  }

  remove(materialId: number) {
    return this.prisma.material.delete({ where: { materialId } });
  }

  async getLowStockMaterials() {
    const lowStockThreshold = 5;

    return this.prisma.material.findMany({
      where: {
        quantity: {
          lt: lowStockThreshold
        }
      }
    });
  }
}

export default MaterialsService;
