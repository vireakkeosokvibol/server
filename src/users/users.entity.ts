import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { TelsEntity } from './tels/tels.entity';
import { SessionsEntity } from './sessions/sessions.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: true,
  })
  username: string;

  @Column()
  password: string;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @OneToMany(
    type => TelsEntity,
    tels => tels.user,
  )
  tels: TelsEntity[];

  @OneToMany(
    type => SessionsEntity,
    sessions => sessions.user,
  )
  sessions: SessionsEntity[];
}
