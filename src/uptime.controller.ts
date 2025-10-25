import { UptimeService } from './uptime.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { siteDto } from './uptime.dto';

@Controller('site')
export class UptimeController {
  constructor(private readonly uptimeService: UptimeService) {}

  @Get('/')
  async getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    page = Number(page);
    limit = Number(limit);

    return await this.uptimeService.getSites({ limit: limit, page: page });
  }

  @Get(':host')
  async getStatus(@Param('host') host: string) {
    return this.uptimeService.getStatus(host);
  }

  @Post('/')
  async addHost(@Body() body: siteDto) {
    return await this.uptimeService.addHost(body.host);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron(): Promise<any> {
    this.uptimeService.handleCron();
  }
}
