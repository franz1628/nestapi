import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { JwtModule } from '@nestjs/jwt';
import { ChatService } from '../chat/chat.service';
import { ChatGateway } from '../chat/chat.gateway';
import { ChatModule } from '../chat/chat.module';

@Module({
    imports: [
      ChatModule,
      TypeOrmModule.forFeature([Message]),
      JwtModule.register({
        global: true,
        secret: '123456',
        signOptions: { expiresIn: '60s' },
      }),
    ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
