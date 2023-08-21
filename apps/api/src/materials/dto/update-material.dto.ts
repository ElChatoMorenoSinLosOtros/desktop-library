import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from '@nestjs/class-validator';
import { PartialType } from '@nestjs/swagger';
import CreateMaterialDto from './create-material.dto';

class UpdateMaterialDto extends PartialType(CreateMaterialDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  isbn?: string;

  @IsOptional()
  @IsPositive()
  @IsNotEmpty()
  publicationYear?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  pageCount?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  available?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type_material: string;
}

export default UpdateMaterialDto;
