import { Module } from "@nestjs/common";
import { AppController } from "../controllers/app/app.controller";
import { AppService } from "../services/app.service";

import { IntegrationsModule } from "./integrations.module";

@Module({
  imports: [IntegrationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
