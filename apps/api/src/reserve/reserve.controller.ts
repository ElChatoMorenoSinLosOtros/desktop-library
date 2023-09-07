import JwtAuthGuard from '@auth/jwt-auth.guard';
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
import CreateReserveDto from './dto/create-reserve.dto';
import UpdateReserveDto from './dto/update-reserve.dto';
import ReserveEntity from './entities/reserve.entity';
import ReserveService from './reserve.service';

@Controller('Reserve')
@ApiTags('Reserve')
class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReserveEntity })
  create(@Body() createReserveDto: CreateReserveDto) {
    return this.reserveService.create(createReserveDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReserveEntity, isArray: true })
  findAll() {
    return this.reserveService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReserveEntity })
  findOne(@Param('id') id: string) {
    return this.reserveService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReserveEntity })
  update(@Param('id') id: string, @Body() updateReserveDto: UpdateReserveDto) {
    return this.reserveService.update(+id, updateReserveDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReserveEntity })
  remove(@Param('id') id: string) {
    return this.reserveService.remove(+id);
  }
}

export default ReserveController;
