import type { responseInterface } from './uptime.types';
import { UptimeService } from './uptime.service';
export declare class UptimeController {
    private readonly appService;
    constructor(appService: UptimeService);
    getAll(): responseInterface;
    handleCron(): Promise<any>;
}
