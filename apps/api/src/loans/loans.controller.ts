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
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
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
  @ApiOperation({ summary: 'create a new loan' })
  create(@Body() clientId: number, createLoanDto: CreateLoanDto) {
    return this.loansService.create(clientId, createLoanDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: LoanEntity, isArray: true })
  @ApiOperation({ summary: 'get all loans' })
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: LoanEntity })
  @ApiOperation({ summary: 'create one loan by id' })
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: LoanEntity })
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: LoanEntity })
  remove(@Param('id') id: string) {
    return this.loansService.remove(+id);
  }
}
