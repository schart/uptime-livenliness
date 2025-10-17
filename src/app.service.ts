import { Injectable, Logger } from '@nestjs/common';
import { sites } from './app.entity';
import { apiClient } from './app.api-client';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger();

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
        }

        site.lastUpdate = new Date().toISOString();
      }),
    );
  }
}
