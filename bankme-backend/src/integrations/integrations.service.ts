import { Injectable } from '@nestjs/common';
import { IntegrationsDTO } from './integrations.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  async payableExists(id: string) {
    return await this.prisma.payable.findFirst({
      where: {
        id: id,
      },
    });
  }

  async createPayable(data: IntegrationsDTO) {
    console.log("Receiving payable data...")

    return await this.prisma.payable.create({
      data
    })
  }
}
