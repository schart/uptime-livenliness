import { Module } from '@nestjs/common';
import { UptimeController } from './uptime.controller';
import { UptimeService } from './uptime.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UptimeGateway } from './uptime.gateway';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [UptimeController],
  providers: [UptimeService, UptimeGateway],
})
export class AppModule {}
