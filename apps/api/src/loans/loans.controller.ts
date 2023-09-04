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
import CreateLoanDto from './dto/create-loan.dto';
import UpdateLoanDto from './dto/update-loan.dto';
import LoanEntity from './entities/loan.entity';
import LoansService from './loans.service';

@ApiTags('loans')
@Controller('loans')
export default class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: LoanEntity })
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: LoanEntity, isArray: true })
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: LoanEntity })
  findOne(@Param('id') id: number) {
    return this.loansService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: LoanEntity })
  update(@Param('id') id: number, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: LoanEntity })
  remove(@Param('id') id: number) {
    return this.loansService.remove(+id);
  }
}
