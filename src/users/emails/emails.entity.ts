import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity('user_emails')
export class EmailsEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  
  @Column({unique: true})
  readonly address: string;

  @Column({type: 'uuid'})
  readonly user: string;

  @UpdateDateColumn()
  readonly updated: Date;

  @CreateDateColumn()
  readonly created: Date;

}