import { apiClient } from './uptime.api.client';
import { UptimeGateway } from './uptime.gateway';
import { Injectable, Logger } from '@nestjs/common';
import { InfluxService } from './uptime.influx.service';
import { sequelizeService } from './uptime.sequelize.service';
import { responseInterface, siteEntityInterface } from './uptime.types';

@Injectable()
export class UptimeService {
  private readonly logger: Logger = new Logger();
  constructor(
    private readonly gateway: UptimeGateway,
    private influxService: InfluxService,
    private readonly sequelizeService: sequelizeService,
  ) {}

  async handleCron() {
    const sites = await this.sequelizeService.findAllService();
    await Promise.all(
      sites.map(async (site) => {
        const host = site.host || site.dataValues.host;
        const url = host.startsWith('http') ? host : `https://${host}`;
        let status: 'UP' | 'DOWN' = 'DOWN';

        try {
          await apiClient({
            method: 'GET',
            url: url,
          });
          status = 'UP';
          this.logger.debug(`UP: ${site.dataValues.host}`);
        } catch (error) {
          if (error.status < 500) {
            status = 'UP';
            this.logger.debug(`UP: ${site.dataValues.host}`);
          } else {
            this.logger.error(`DOWN: ${site.dataValues.host}`);
          }
        }

        const objectOfSite: siteEntityInterface = {
          host: site.dataValues.host,
          status: status,
          updateAt: new Date().toISOString(),
        };

        await this.influxService.writeCheck(objectOfSite);
        this.gateway.sendStatusUpdate(objectOfSite);
      }),
    );
  }

  async addHost(host: string): Promise<responseInterface> {
    const objectOfSite = {
      host: `https://${host}`,
      status: 'DOWN',
      updateAt: new Date().toISOString(),
    };

    await this.sequelizeService.addSiteService(host);
    await this.influxService.writeCheck(objectOfSite);
    this.gateway.sendStatusUpdate(objectOfSite);

    return {
      status: 200,
      content: objectOfSite,
    };
  }

  async getSites(pagination?: {
    page: number;
    limit: number;
  }): Promise<responseInterface> {
    return {
      status: 200,
      content: (await this.sequelizeService.findAllService()) || null,
    };
  }

  async getStatus(host: string): Promise<responseInterface> {
    return {
      status: 200,
      content:
        (await this.influxService.getHostStatus(`https://${host}.com`)) || null,
    };
  }
}
