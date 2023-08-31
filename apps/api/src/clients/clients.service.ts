import { Injectable } from '@nestjs/common';
import PrismaService from '@pr-prisma/prisma.service';
import CreateClientDto from './dto/create-client.dto';
import UpdateClientDto from './dto/update-client.dto';

@Injectable()
class ClientsService {
  constructor(private prisma: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: createClientDto
    });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  findOne(clientId: number) {
    return this.prisma.client.findMany({
      where: { clientId }
    });
  }

  update(clientId: number, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({
      where: { clientId },
      data: updateClientDto
    });
  }

  remove(clientId: number) {
    return this.prisma.client.delete({
      where: { clientId }
    });
  }
}

export default ClientsService;
