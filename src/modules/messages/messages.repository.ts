import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseError } from '@utils/error/errors';
import { MongoRepository } from 'typeorm';
import { MessageEntity } from './ entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly dbConnection: MongoRepository<MessageEntity>,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    senderId: string,
    chatId: string,
  ): Promise<MessageEntity | DatabaseError> {
    try {
      const messageToSave = new MessageEntity();
      messageToSave.text = createMessageDto.text;
      messageToSave.senderId = senderId;
      messageToSave.chatId = chatId;
      return await this.dbConnection.save(messageToSave);
    } catch (cause) {
      console.log(cause);
      return new DatabaseError('Impossibile creare chat', {
        cause,
      });
    }
  }
}
