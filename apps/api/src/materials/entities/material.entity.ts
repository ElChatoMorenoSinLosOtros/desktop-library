import { ApiProperty } from '@nestjs/swagger';
import { Material } from '@prisma/client';

export default class MaterialEntity implements Material {
  @ApiProperty()
  materialId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  publicationYear: number;

  @ApiProperty()
  pageCount: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  available: boolean;

  @ApiProperty()
  type_material: string;
}
