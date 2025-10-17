type status = 'UP' | 'DOWN';
export interface siteEntityInterface {
    host: string;
    status: status;
    lastUpdate: number | string;
}
export interface responseInterface {
    status: number;
    content: any;
}
export {};
