import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { siteEntityInterface } from './uptime.types';

@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class UptimeGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  sendStatusUpdate(site: siteEntityInterface) {
    this.server.emit('statusUpdate', site);
  }
}
