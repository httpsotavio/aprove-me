import { Injectable } from '@nestjs/common';
import { PayableDTO, AssignorDTO } from './integrations.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  async createPayable(data: PayableDTO) {
    return await this.prisma.payable.create({
      data
    })
  }

  async getPayable(id: number) {
    return await this.prisma.payable.findFirst({
      where: {
        id: id,
      },
    })
  }

  async createAssignor(data: AssignorDTO) {
    return await this.prisma.assignor.create({
      data
    })
  }

  async assignorExists(email: string) {
    return await this.prisma.assignor.findFirst({
      where: {
        email: email
      }
    })
  }

  async getAssignor(id: number) {
    return await this.prisma.assignor.findFirst({
      where: {
        id: id,
      },
    })
  }
}
