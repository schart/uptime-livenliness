import { Module } from '@nestjs/common';
import { UptimeController } from './uptime.controller';
import { UptimeService } from './uptime.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UptimeGateway } from './uptime.gateway';
import { InfluxService } from './uptime.influx.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SiteModel } from './uptime.entity';
import { sequelizeService } from './uptime.sequelize.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'livelinees_db',
      synchronize: true,
      logging: true, // enable logging to see errors
      models: [SiteModel],
    }),

    SequelizeModule.forFeature([SiteModel]),

    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [UptimeController],
  providers: [UptimeService, UptimeGateway, InfluxService, sequelizeService],
})
export class AppModule {}
