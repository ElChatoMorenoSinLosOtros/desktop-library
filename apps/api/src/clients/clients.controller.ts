import JwtAuthGuard from '@auth/jwt-auth.guard';
import FineEntity from '@fine/entities/fine.entity';
import LoanEntity from '@loans/entities/loan.entity';
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
import ClientsService from './clients.service';
import CreateClientDto from './dto/create-client.dto';
import UpdateClientDto from './dto/update-client.dto';
import ClientEntity from './entities/client.entity';
import InfoEntity from './entities/info.entity';

@Controller('clients')
@ApiTags('clients')
class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ClientEntity })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ClientEntity, isArray: true })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ClientEntity })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ClientEntity })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ClientEntity })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }

  @Get(':clientId/total-read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getTotalRead(@Param('clientId') clientId: string) {
    return this.clientsService.getTotalRead(+clientId);
  }

  @Get(':clientId/total-active-loans')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getTotalActiveLoans(@Param('clientId') clientId: string) {
    return this.clientsService.getTotalActiveLoans(+clientId);
  }

  @Get(':clientId/total-fine')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getTotalFine(@Param('clientId') clientId: string) {
    return this.clientsService.getTotalFine(+clientId);
  }

  @Get(':clientId/total-reserve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getTotalReserve(@Param('clientId') clientId: string) {
    return this.clientsService.getTotalReserves(+clientId);
  }

  @Get(':clientId/more-info')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: InfoEntity })
  getMoreInfo(@Param('clientId') clientId: string) {
    return this.clientsService.getMoreInfo(+clientId);
  }

  @Get(':clientId/loans')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: LoanEntity, isArray: true })
  getLoans(@Param('clientId') clientId: string) {
    return this.clientsService.getAllLoans(+clientId);
  }

  @Get(':clientId/fines')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: FineEntity, isArray: true })
  getFines(@Param('clientId') clientId: string) {
    return this.clientsService.getAllFines(+clientId);
  }
}

export default ClientsController;
