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
import AdminsService from './admins.service';
import CreateAdminDto from './dto/create-admin.dto';
import UpdateAdminDto from './dto/update-admin.dto';
import AdminEntity from './entities/admin.entity';

@Controller('admins')
@ApiTags('admins')
export default class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiCreatedResponse({ type: AdminsController })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @ApiOkResponse({ type: AdminEntity, isArray: true })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AdminEntity })
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AdminEntity })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AdminEntity })
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
