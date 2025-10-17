import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { siteEntityInterface } from './uptime.types';
export declare class UptimeGateway implements OnGatewayConnection {
    server: Server;
    handleConnection(client: any, ...args: any[]): void;
    sendStatusUpdate(site: siteEntityInterface): void;
}
