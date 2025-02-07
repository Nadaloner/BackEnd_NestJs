import { ObjectId } from 'mongodb';
import { BeforeInsert, Column, Entity, ObjectIdColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity('chats')
export class ChatEntity {
  @ObjectIdColumn()
  private _id: ObjectId;

  @Column({ unique: true })
  id: string;

  @Column()
  name: string;

  @Column()
  partecipantsIds: string[];

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  bio: string;
  username: string;

  @BeforeInsert()
  private generateId() {
    this.id = v4();
  }
}
