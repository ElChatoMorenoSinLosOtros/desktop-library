import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import CreateMaterialDto from './dto/create-material.dto';
import UpdateMaterialDto from './dto/update-material.dto';
import MaterialEntity from './entities/material.entity';
import MaterialsService from './materials.service';

@Controller('materials')
@ApiTags('materials')
class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MaterialEntity })
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MaterialEntity, isArray: true })
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MaterialEntity })
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MaterialEntity })
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto
  ) {
    return this.materialsService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MaterialEntity })
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }
}

export default MaterialsController;
