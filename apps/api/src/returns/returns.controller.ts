import JwtAuthGuard from '@/auth/jwt-auth.guard';
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
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import CreateReturnDto from './dto/create-return.dto';
import UpdateReturnDto from './dto/update-return.dto';
import ReturnEntity from './entities/return.entity';
import ReturnsService from './returns.service';

@Controller('returns')
@ApiTags('returns')
export default class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReturnEntity })
  @Post()
  create(@Body() createReturnDto: CreateReturnDto) {
    return this.returnsService.create(createReturnDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReturnEntity, isArray: true })
  @Get()
  findAll() {
    return this.returnsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReturnEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReturnEntity })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturnDto: UpdateReturnDto) {
    return this.returnsService.update(+id, updateReturnDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReturnEntity })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnsService.remove(+id);
  }
}
