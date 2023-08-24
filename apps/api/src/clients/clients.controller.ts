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
import ClientsService from './clients.service';
import CreateClientDto from './dto/create-client.dto';
import UpdateClientDto from './dto/update-client.dto';
import ClientEntity from './entities/client.entity';

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
}

export default ClientsController;
