import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import type { responseInterface } from './uptime.types';
import { UptimeService } from './uptime.service';

@Controller('site')
export class UptimeController {
  constructor(private readonly appService: UptimeService) {}

  @Get('/')
  getAll(): responseInterface {
    return this.appService.getSites();
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron(): Promise<any> {
    this.appService.handeCron();
  }
}
