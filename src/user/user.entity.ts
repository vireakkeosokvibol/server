import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { UserEmailEntity } from './email/email.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  username: string;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @OneToMany(
    type => UserEmailEntity,
    userEmailEntity => userEmailEntity.userEntity,
  )
  userEmailEntity: UserEmailEntity[];
}
