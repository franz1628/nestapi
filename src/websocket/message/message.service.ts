import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { MessageDto } from './dto/message.dto';
import { plainToInstance } from 'class-transformer';
import { ProvinciaDto } from 'src/provincia/dto/provincia.dto';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class MessageService {
  
  constructor(
    @InjectRepository(Message)
    private readonly repository : Repository<Message>,
    private readonly serviceChat:ChatService
  ){
  }

  async create(createMessageDto: CreateMessageDto) {
    const model = this.toDto(await this.repository.save(createMessageDto));

    this.serviceChat.saveMessage(model.texto);
    return model;
  } 

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  private toDto(model:Message):MessageDto{
    return plainToInstance(MessageDto, model, {
      excludeExtraneousValues: true, // Solo transforma las propiedades definidas en el DTO
      enableImplicitConversion:true
    });
  }
}
