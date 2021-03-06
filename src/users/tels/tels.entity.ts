import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UsersEntity } from '../users.entity';

@Entity('user_tels')
export class TelsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  address: string;

  @Column({ default: false })
  primary: boolean;

  @Column({ default: false })
  verified: boolean;

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
