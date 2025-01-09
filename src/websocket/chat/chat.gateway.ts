import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): string {
    console.log(`Mensaje recibido: ${message}`);
    return `Respuesta: ${message}`;
  }

  sendNotificationToAll(event: string, message: any) {
    this.server.emit(event, message); 
  }
}
