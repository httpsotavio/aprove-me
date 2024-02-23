// tree.module.ts

import { Module } from '@nestjs/common';

import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [IntegrationsService, PrismaService],
  controllers: [IntegrationsController],
})

export class IntegrationsModule {}