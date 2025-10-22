import { UptimeService } from './uptime.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import type { responseInterface } from './uptime.types';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { siteDto } from './uptime.dto';

@Controller('site')
export class UptimeController {
  constructor(private readonly uptimeService: UptimeService) {}

  @Get('/')
  getAll(): responseInterface {
    return this.uptimeService.getSites();
  }

  @Get(':host')
  async getStatus(@Param('host') host: string) {
    return this.uptimeService.getStatus(host);
  }

  @Post('/add')
  async addHost(@Body() body: siteDto) {
    return this.uptimeService.addHost(body.host);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron(): Promise<any> {
    this.uptimeService.handeCron();
  }
}
