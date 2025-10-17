import { UptimeGateway } from './uptime.gateway';
export declare class UptimeService {
    private readonly gateway;
    private readonly logger;
    constructor(gateway: UptimeGateway);
    getSites(): {
        status: number;
        content: {
            host: string;
            status: "UP" | "DOWN";
            lastUpdate: string | number;
        }[];
    };
    handeCron(): Promise<void>;
}
