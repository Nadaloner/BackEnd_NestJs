import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';

import { ProfilesModule } from './modules/profiles/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from './modules/chats/chats.module';
import { MessageModule } from './modules/messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: 'mongodb+srv://studenti:1234@nestjs-course.96eon.mongodb.net/',
      type: 'mongodb',
      database: 'marco-nadalon-corso',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProfilesModule,
    ChatsModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
