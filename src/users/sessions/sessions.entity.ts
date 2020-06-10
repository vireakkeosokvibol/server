import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UsersEntity } from '../users.entity';

@Entity('user_sessions')
export class SessionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  expired: boolean;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(
    type => UsersEntity,
    users => users.tels,
  )
  user: UsersEntity;
}
