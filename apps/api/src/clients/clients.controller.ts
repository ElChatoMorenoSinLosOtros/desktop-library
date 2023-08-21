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
import ClientsService from './clients.service';
import CreateClientDto from './dto/create-client.dto';
import UpdateClientDto from './dto/update-client.dto';
import ClientEntity from './entities/client.entity';

@Controller('clients')
@ApiTags('clients')
class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiCreatedResponse({ type: ClientEntity })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOkResponse({ type: ClientEntity, isArray: true })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ClientEntity })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ClientEntity })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ClientEntity })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}

export default ClientsController;
