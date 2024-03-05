import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { AssignorDTO, PayableDTO } from './integrations.dto';

@Controller("integrations")
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post("/payable")
  async createPayable(@Body() data: PayableDTO) {
    data.emissionDate = new Date()

    const checkIfHaveAnyNull = (!data.assignor || !data.emissionDate || !data.value) ? true : false
    if (checkIfHaveAnyNull) {
      const getNulls = () => {
        let strReturn = [] // array to avoid memory garbage
        if (!data.assignor) strReturn.push("value")
        if (!data.emissionDate) strReturn.push("emissionDate")
        if (!data.value) strReturn.push("assignor")
        return strReturn.concat()
      }
      throw new HttpException(`Missing attribute(s): ${getNulls()}`, HttpStatus.BAD_REQUEST)
    }

    return await this.integrationsService.createPayable(data)
  }

  @Post("/assignor")
  async createAssignor(@Body() data: AssignorDTO) {
    const assignor = await this.integrationsService.assignorExists(data.email)
    if (assignor) {
      throw new HttpException(`Assignor already exists.`, HttpStatus.FOUND)
    }

    const checkIfHaveAnyNull = (!data.document || !data.email || !data.name || !data.phone) ? true : false
    if (checkIfHaveAnyNull) {
      const getNulls = () => {
        let strReturn = [] // array to avoid memory garbage
        if (!data.document) strReturn.push("document")
        if (!data.email) strReturn.push("email")
        if (!data.name) strReturn.push("name")
        if (!data.phone) strReturn.push("phone")
        return strReturn.concat()
      }
      throw new HttpException(`Missing attribute(s): ${getNulls()}`, HttpStatus.BAD_REQUEST)
    }

    return await this.integrationsService.createAssignor(data)
  }

  @Get("/payable/:id")
  async returnPayable(@Param("id") id) {
    if (!id) {
      throw new HttpException(`Missing payable id.`, HttpStatus.BAD_REQUEST)
    }

    const payableId = Number(id)
    const payable = await this.integrationsService.getPayable(payableId)
    if (!payable) {
      throw new HttpException(`Payable not exists.`, HttpStatus.NOT_FOUND)
    }

    return payable
  }

  @Get("/assignor/:id")
  async returnAssignor(@Param("id") id) {
    if (!id) {
      throw new HttpException(`Missing assignor id.`, HttpStatus.BAD_REQUEST)
    }

    const assignorId = Number(id)
    const assignor = await this.integrationsService.getAssignor(assignorId)
    if (!assignor) {
      throw new HttpException(`Assignor not exists.`, HttpStatus.NOT_FOUND)
    }

    return assignor
  }
}