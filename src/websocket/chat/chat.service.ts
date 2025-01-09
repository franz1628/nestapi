import { Injectable } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {

  constructor(private readonly chatGateway :ChatGateway){

  }

  saveMessage(message: string) {
    this.chatGateway.sendNotificationToAll("message",message)
  }
}
