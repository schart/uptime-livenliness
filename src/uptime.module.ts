import { Module } from '@nestjs/common';
import { UptimeController } from './uptime.controller';
import { UptimeService } from './uptime.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UptimeGateway } from './uptime.gateway';
import { InfluxService } from './uptime.influx.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [UptimeController],
  providers: [UptimeService, UptimeGateway, InfluxService],
})
export class AppModule {}
