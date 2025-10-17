export declare class AppService {
    private readonly logger;
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
