import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    unique: true,
  })
  readonly username: string;

  @Column()
  readonly password: string;

  @UpdateDateColumn()
  readonly updated: Date;

  @CreateDateColumn()
  readonly created: Date;
}
