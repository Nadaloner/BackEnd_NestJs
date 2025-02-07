import { Injectable } from '@nestjs/common';
import { ChatEntity } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseError } from '@utils/error/errors';
import { MongoRepository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsRepository {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly dbConnection: MongoRepository<ChatEntity>,
  ) {}

  async create(
    createChatDto: CreateChatDto,
  ): Promise<ChatEntity | DatabaseError> {
    try {
      const chatToSave = new ChatEntity();
      chatToSave.username = createChatDto.username;
      chatToSave.partecipantsIds = createChatDto.participantsId;
      return await this.dbConnection.save(chatToSave);
    } catch (cause) {
      console.log(cause);
      return new DatabaseError('Impossibile creare chat', {
        cause,
      });
    }
  }
}
