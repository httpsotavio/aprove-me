import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { IntegrationsService } from "../../services/integrations.service";
import { AssignorDTO, PayableDTO } from "../../dtos/integrations.dto";

@Controller("integrations")
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post("/payable")
  async createPayable(@Body() data: PayableDTO) {
    data.emissionDate = new Date();

    const checkIfHaveAnyNull =
      !data.assignor || !data.emissionDate || !data.value ? true : false;
    if (checkIfHaveAnyNull) {
      const getNulls = () => {
        const strReturn = []; // array to avoid memory garbage
        if (!data.assignor) strReturn.push("value");
        if (!data.emissionDate) strReturn.push("emissionDate");
        if (!data.value) strReturn.push("assignor");
        return strReturn.concat();
      };
      throw new HttpException(
        `Missing attribute(s): ${getNulls()}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.integrationsService.createPayable(data);
    } catch (err) {
      console.log(
        `Error when creating an payable: ${err}\nPayable data: ${data} `,
      );
    }
  }

  @Get("/payable/:id")
  async returnPayable(@Param("id") id) {
    if (!id) {
      throw new HttpException(`Missing payable id.`, HttpStatus.BAD_REQUEST);
    }

    const payableId = Number(id);
    const payable = await this.integrationsService.getPayable(payableId);
    if (!payable) {
      throw new HttpException(`Payable not exists.`, HttpStatus.NOT_FOUND);
    }

    return payable;
  }

  @Post("/payable/edit")
  async editPayable(@Body() data: PayableDTO) {
    if (!data.id) {
      throw new HttpException(`Missing payable id.`, HttpStatus.BAD_REQUEST);
    }

    if (typeof data.id != "number") {
      throw new HttpException(
        `Payable id must be a number.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const payableId = Number(data.id);
    const payable = await this.integrationsService.getPayable(payableId);
    if (!payable) {
      throw new HttpException(`Payable not exists.`, HttpStatus.NOT_FOUND);
    }

    try {
      return await this.integrationsService.updatePayable(data);
    } catch (err) {
      console.log(
        `Error when updating an payable: ${err}\nPayable data: ${data} `,
      );
    }
  }

  @Post("/payable/delete")
  async deletePayable(@Body() data: PayableDTO) {
    if (!data.id) {
      throw new HttpException(`Missing payable id.`, HttpStatus.BAD_REQUEST);
    }

    if (typeof data.id != "number") {
      throw new HttpException(
        `Payable id must be a number.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const payableId = Number(data.id);
    const payable = await this.integrationsService.getPayable(payableId);
    if (!payable) {
      throw new HttpException(`Payable not exists.`, HttpStatus.NOT_FOUND);
    }

    try {
      return await this.integrationsService.deletePayable(data.id);
    } catch (err) {
      console.log(
        `Error when deleting an payable: ${err}\nPayable data: ${data} `,
      );
    }
  }

  @Post("/assignor")
  async createAssignor(@Body() data: AssignorDTO) {
    const assignor = await this.integrationsService.getAssignorByEmail(
      data.email,
    );
    if (assignor) {
      throw new HttpException(`Assignor already exists.`, HttpStatus.FOUND);
    }

    const checkIfHaveAnyNull =
      !data.document || !data.email || !data.name || !data.phone ? true : false;
    if (checkIfHaveAnyNull) {
      const getNulls = () => {
        const strReturn = []; // array to avoid memory garbage
        if (!data.document) strReturn.push("document");
        if (!data.email) strReturn.push("email");
        if (!data.name) strReturn.push("name");
        if (!data.phone) strReturn.push("phone");
        return strReturn.concat();
      };
      throw new HttpException(
        `Missing attribute(s): ${getNulls()}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.integrationsService.createAssignor(data);
    } catch (err) {
      console.log(
        `Error when creating an assignor: ${err}\nAssignor data: ${data} `,
      );
    }
  }

  @Get("/assignor/:id")
  async returnAssignor(@Param("id") id) {
    if (!id) {
      throw new HttpException(`Missing assignor id.`, HttpStatus.BAD_REQUEST);
    }

    const assignorId = Number(id);
    const assignor = await this.integrationsService.getAssignor(assignorId);
    if (!assignor) {
      throw new HttpException(`Assignor not exists.`, HttpStatus.NOT_FOUND);
    }

    return assignor;
  }

  @Post("/assignor/edit")
  async editAssignor(@Body() data: AssignorDTO) {
    if (!data.id) {
      throw new HttpException(`Missing assignor id.`, HttpStatus.BAD_REQUEST);
    }

    if (typeof data.id != "number") {
      throw new HttpException(
        `Assignor id must be a number.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const assignorId = Number(data.id);
    const assignor = await this.integrationsService.getAssignor(assignorId);
    if (!assignor) {
      throw new HttpException(`Assignor not exists.`, HttpStatus.NOT_FOUND);
    }

    try {
      return await this.integrationsService.updateAssignor(data);
    } catch (err) {
      console.log(
        `Error when editing an assignor: ${err}\nAssignor data: ${data} `,
      );
    }
  }

  @Post("/assignor/delete")
  async deleteAssignor(@Body() data: AssignorDTO) {
    if (!data.id) {
      throw new HttpException(`Missing assignor id.`, HttpStatus.BAD_REQUEST);
    }

    if (typeof data.id != "number") {
      throw new HttpException(
        `Assignor id must be a number.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const assignorId = Number(data.id);
    const assignor = await this.integrationsService.getAssignor(assignorId);
    if (!assignor) {
      throw new HttpException(`Assignor not exists.`, HttpStatus.NOT_FOUND);
    }

    try {
      return await this.integrationsService.deleteAssignor(data.id);
    } catch (err) {
      console.log(
        `Error when deleting an assignor: ${err}\nAssignor data: ${data} `,
      );
    }
  }
}
