import { sites } from './uptime.entity';
import { apiClient } from './uptime.api.client';
import { UptimeGateway } from './uptime.gateway';
import { Injectable, Logger } from '@nestjs/common';
import { InfluxService } from './uptime.influx.service';

@Injectable()
export class UptimeService {
  private readonly logger: Logger = new Logger();
  constructor(
    private readonly gateway: UptimeGateway,
    private influx: InfluxService,
  ) {}

  getSites() {
    return {
      status: 200,
      content: sites.map(({ host, status, lastUpdate }) => ({
        host,
        status,
        lastUpdate,
      })),
    };
  }

  async getStatus(host: string) {
    return await this.influx.getHostStatus(`https://${host}.com`);
  }

  addHost(host: string) {
    sites.push({
      host: `https://${host}`,
      status: 'DOWN',
      lastUpdate: '',
    });

    // this.gateway.sendStatusUpdate(sites[sites.length - 1]);
    return { status: 200, content: sites[sites.length - 1] };
  }

  async handeCron() {
    // let updates: siteEntityInterface[] = []; to batch

    await Promise.all(
      sites.map(async (site) => {
        try {
          await apiClient({
            method: 'GET',
            url: site.host,
          });

          site.status = 'UP';
          this.logger.debug(`UP: ${site.host}`);
        } catch (e) {
          site.status = 'DOWN';
          this.logger.error(`DOWN: ${site.host}`); //, e.stack);
        } finally {
          site.lastUpdate = new Date().toISOString();
          await this.influx.writeCheck(site);
          this.gateway.sendStatusUpdate(site);
        }
      }),
    );
  }
}
