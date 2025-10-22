import { UptimeService } from './uptime.service';
import type { responseInterface } from './uptime.types';
import { siteDto } from './uptime.dto';
export declare class UptimeController {
    private readonly uptimeService;
    constructor(uptimeService: UptimeService);
    getAll(): responseInterface;
    getStatus(host: string): Promise<{} | null>;
    addHost(body: siteDto): Promise<{
        status: number;
        content: import("./uptime.types").siteEntityInterface;
    }>;
    handleCron(): Promise<any>;
}
