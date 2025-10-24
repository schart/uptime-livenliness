import { Injectable } from '@nestjs/common';
import {
  InfluxDB,
  Point,
  QueryApi,
  WriteApi,
} from '@influxdata/influxdb-client';
import { siteEntityInterface } from './uptime.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfluxService {
  private influx: InfluxDB;
  private writeApi: WriteApi;
  private queryApi: QueryApi;

  constructor(private readonly config: ConfigService) {
    this.influx = new InfluxDB({
      url: this.config.get<any>('INFLUX_URL'),
      token: this.config.get<string>('INFLUX_TOKEN'),
    });

    this.writeApi = this.influx.getWriteApi(
      this.config.get<any>('INFLUX_ORG'),
      this.config.get<any>('INFLUX_BUCKET'),
    );

    this.queryApi = this.influx.getQueryApi(this.config.get<any>('INFLUX_ORG'));
  }

  async writeCheck(data: siteEntityInterface) {
    const point = new Point('site-status')
      .tag('host', data.host)
      .stringField('status', data.status)
      .stringField('updateAt', data.updateAt);

    this.writeApi.writePoint(point);
    await this.writeApi.flush();
  }

  async getHostStatus(host: string) {
    const query = `
      from(bucket: "uptime")
        |> range(start: -10m)
        |> filter(fn: (r) => r._measurement == "site-status" and r.host == "${host}")
        |> last()
    `;
    const data = await this.queryApi.collectRows(query);
    return data[0] || null;
  }
}
