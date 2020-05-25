import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { EmailsEntity } from './emails/emails.entity'

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    unique: true,
    nullable: true,
  })
  readonly username: string;

  @Column()
  readonly password: string;

  @UpdateDateColumn()
  readonly updated: Date;

  @CreateDateColumn()
  readonly created: Date;

  @OneToMany(type => EmailsEntity, emails => emails.user)
  emails: EmailsEntity[];
}
