import { AppService } from './app.service';
import type { responseInterface } from './app.types';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getAll(): responseInterface;
    handleCron(): Promise<any>;
}
