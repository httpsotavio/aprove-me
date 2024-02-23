import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { IntegrationsDTO } from './integrations.dto';

@Controller("integrations")
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post("/payable")
  async createPayable(@Body() data: IntegrationsDTO) {

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

    // data.emissionDate = new Date()
    return await this.integrationsService.createPayable(data)
  }
}