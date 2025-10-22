import { UptimeGateway } from './uptime.gateway';
import { InfluxService } from './uptime.influx.service';
export declare class UptimeService {
    private readonly gateway;
    private influx;
    private readonly logger;
    constructor(gateway: UptimeGateway, influx: InfluxService);
    getSites(): {
        status: number;
        content: {
            host: string;
            status: "UP" | "DOWN";
            lastUpdate: string | number;
        }[];
    };
    getStatus(host: string): Promise<{} | null>;
    addHost(host: string): {
        status: number;
        content: import("./uptime.types").siteEntityInterface;
    };
    handeCron(): Promise<void>;
}
