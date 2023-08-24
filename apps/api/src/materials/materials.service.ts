import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import CreateMaterialDto from './dto/create-material.dto';
import UpdateMaterialDto from './dto/update-material.dto';

@Injectable()
class MaterialsService {
  constructor(private prisma: PrismaService) {}

  create(createMaterialDto: CreateMaterialDto) {
    return this.prisma.material.create({
      data: { ...createMaterialDto, available: true, type_material: 'book' }
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
}

export default MaterialsService;
