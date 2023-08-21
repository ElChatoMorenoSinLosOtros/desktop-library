import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import CreateMaterialDto from './dto/create-material.dto';
import UpdateMaterialDto from './dto/update-material.dto';
import MaterialEntity from './entities/material.entity';
import MaterialsService from './materials.service';

@Controller('materials')
@ApiTags('materials')
class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiCreatedResponse({ type: MaterialEntity })
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  @ApiOkResponse({ type: MaterialEntity, isArray: true })
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MaterialEntity })
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: MaterialEntity })
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto
  ) {
    return this.materialsService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: MaterialEntity })
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }
}

export default MaterialsController;
