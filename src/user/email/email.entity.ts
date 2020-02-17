import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  Column,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../user.entity';

@Entity()
export class UserEmailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  address: string;

  @Column({ default: false })
  primary: boolean;

  @Column({ default: false })
  active: boolean;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(
    type => UserEntity,
    userEntity => userEntity.userEmailEntity,
  )
  userEntity: UserEntity;
}
