import { IsBoolean, IsInt, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateMaterialDto {
  @ApiProperty()
  @IsString()
  title?: string;

  @IsString()
  @ApiProperty()
  author?: string;

  @IsString()
  @ApiProperty()
  category?: string;

  @IsString()
  @ApiProperty()
  isbn?: string;

  @IsInt()
  @ApiProperty()
  publicationYear?: number;

  @IsInt()
  @ApiProperty()
  pageCount?: number;

  @IsInt()
  @ApiProperty()
  quantity?: number;

  @IsBoolean()
  @ApiProperty({ default: true })
  available?: boolean;

  @IsString()
  @ApiProperty({ required: true, default: 'book' })
  type_material: string;
}
