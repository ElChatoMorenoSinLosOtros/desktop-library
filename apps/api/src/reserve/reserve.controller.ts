import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import CreateReserveDto from './dto/create-reserve.dto';
import UpdateReserveDto from './dto/update-reserve.dto';
import ReserveService from './reserve.service';

@Controller('reserve')
export default class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  create(@Body() createReserveDto: CreateReserveDto) {
    return this.reserveService.create(createReserveDto);
  }

  @Get()
  findAll() {
    return this.reserveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReserveDto: UpdateReserveDto) {
    return this.reserveService.update(+id, updateReserveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveService.remove(+id);
  }
}
