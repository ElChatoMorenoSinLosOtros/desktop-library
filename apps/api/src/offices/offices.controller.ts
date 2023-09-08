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
import CreateOfficeDto from './dto/create-office.dto';
import UpdateOfficeDto from './dto/update-office.dto';
import OfficeEntity from './entities/office.entity';
import OfficesService from './offices.service';

@ApiTags('offices')
@Controller('offices')
export default class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Post()
  @ApiCreatedResponse({ type: OfficeEntity })
  create(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officesService.create(createOfficeDto);
  }

  @Get()
  @ApiOkResponse({ type: OfficeEntity, isArray: true })
  findAll() {
    return this.officesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: OfficeEntity })
  update(@Param('id') id: string, @Body() updateOfficeDto: UpdateOfficeDto) {
    return this.officesService.update(id, updateOfficeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OfficeEntity })
  remove(@Param('id') id: string) {
    return this.officesService.remove(id);
  }
}
