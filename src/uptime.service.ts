import { Injectable, Logger } from '@nestjs/common';
import { sites } from './uptime.entity';
import { apiClient } from './uptime.api.client';
import { UptimeGateway } from './uptime.gateway';

@Injectable()
export class UptimeService {
  private readonly logger: Logger = new Logger();
  constructor(private readonly gateway: UptimeGateway) {}

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

  async handeCron() {
    await Promise.all(
      sites.map(async (site) => {
        try {
          //  const response: Axios.AxiosXHR<any>
          await apiClient({
            method: 'GET',
            url: site.host,
          });
          site.status = 'UP';

          this.logger.debug(`UP: ${site.host}`);
        } catch (e) {
          site.status = 'DOWN';
          this.logger.error(`DOWN: ${site.host}`, e.stack);
        } finally {
          site.lastUpdate = new Date().toISOString();
          this.gateway.sendStatusUpdate(site);
        }
      }),
    );
  }
}
