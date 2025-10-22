import { siteEntityInterface } from './uptime.types';
import { ConfigService } from '@nestjs/config';
export declare class InfluxService {
    private readonly config;
    private influx;
    private writeApi;
    private queryApi;
    constructor(config: ConfigService);
    writeCheck(data: siteEntityInterface): Promise<void>;
    getHostStatus(host: string): Promise<{} | null>;
}
