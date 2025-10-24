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

  async getSites(): Promise<responseInterface> {
    return {
      status: 200,
      content: (await this.sequelizeService.findAllSitesService()) || null,
    };
  }

  async getStatus(host: string): Promise<responseInterface> {
    return {
      status: 200,
      content:
        (await this.influxService.getHostStatus(`https://${host}.com`)) || null,
    };
  }

  async addHost(host: string): Promise<responseInterface> {
    await this.sequelizeService.addSiteService(host);
    const objectOfSite = {
      host: `https://${host}`,
      status: 'DOWN',
      updateAt: 0,
    };

    this.gateway.sendStatusUpdate(objectOfSite);
    await this.influxService.writeCheck(objectOfSite);

    return {
      status: 200,
      content: objectOfSite,
    };
  }

  async handleCron() {
    const sites = await this.sequelizeService.findAllSitesService();
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
          }
          this.logger.error(`DOWN: ${site.dataValues.host}`);
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
}
