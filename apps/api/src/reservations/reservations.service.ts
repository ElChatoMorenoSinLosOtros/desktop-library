import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import CreateReservationDto from './dto/create-reservation.dto';
import UpdateReservationDto from './dto/update-reservation.dto';

@Injectable()
export default class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    const reservationData = {
      clientId: createReservationDto.clientId,
      materialId: createReservationDto.materialId,
      initialDate: createReservationDto.initialDate,
      dueDate: createReservationDto.dueDate,
    };

    const createdReservation = await this.prisma.reservation.create({
      data: reservationData
    });
    return createdReservation;
  }

  findAll() {
    return this.prisma.reservation.findMany;
  }

  findOne(reservationId: number) {
    return this.prisma.reservation.findMany({
      where: { reservationId }
    });
  }

  update(reservationId: number, updateReservationDto: UpdateReservationDto) {
    return this.prisma.reservation.update({
      where: { reservationId },
      data: updateReservationDto
    });
  }

  remove(reservationId: number) {
    return this.prisma.reservation.delete({
      where: { reservationId }
    });
  }
}
