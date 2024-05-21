import { Injectable } from "@nestjs/common";
import { PayableDTO, AssignorDTO } from "../dtos/integrations.dto";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  async createPayable(data: PayableDTO) {
    return await this.prisma.payable.create({
      data,
    });
  }

  async getPayable(id: number) {
    return await this.prisma.payable.findFirst({
      where: {
        id: id,
      },
    });
  }

  async updatePayable(data: PayableDTO) {
    return await this.prisma.payable.update({
      where: {
        id: data.id,
      },
      data: data,
    });
  }

  async deletePayable(id: number) {
    return await this.prisma.payable.delete({ where: { id: id } });
  }

  async createAssignor(data: AssignorDTO) {
    return await this.prisma.assignor.create({
      data,
    });
  }

  async getAssignorByEmail(email: string) {
    return await this.prisma.assignor.findFirst({
      where: {
        email: email,
      },
    });
  }

  async getAssignor(id: number) {
    return await this.prisma.assignor.findFirst({
      where: {
        id: id,
      },
    });
  }

  async updateAssignor(data: AssignorDTO) {
    return await this.prisma.assignor.update({
      where: {
        id: data.id,
      },
      data: data,
    });
  }

  async deleteAssignor(id: number) {
    return await this.prisma.assignor.delete({ where: { id: id } });
  }
}
