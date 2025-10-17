import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import type { responseInterface } from './app.types';

@Controller('site')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getAll(): responseInterface {
    return this.appService.getSites();
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron(): Promise<any> {
    this.appService.handeCron();
  }
}
