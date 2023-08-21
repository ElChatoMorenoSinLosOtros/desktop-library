import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import CreateMaterialDto from './dto/create-material.dto';
import UpdateMaterialDto from './dto/update-material.dto';
import MaterialsService from './materials.service';

@Controller('materials')
class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto
  ) {
    return this.materialsService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }
}

export default MaterialsController;
