import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { UsersInput, UsersObject } from './users.type';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository, getConnection, EntityManager } from 'typeorm';
import { EmailsEntity } from './emails/emails.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(EmailsEntity)
    private emailsRepository: Repository<EmailsEntity>,
  ) {}

  async create(usersInput: UsersInput): Promise<UsersObject> {
    /*********************************************************
    Start hash password.                                                               
    *********************************************************/
    let sha256Password: string; // Hashed password with sha256
    let bcryptPassword: string; // Hashed password with sha

    try {
      sha256Password = crypto
        .createHmac('sha256', usersInput.password)
        .digest('base64');
      bcryptPassword = await bcrypt.hash(sha256Password, 12);
    } catch (error) {
      console.log(error);
      throw new Error('Password hashing error!');
    }
    /********************************************************/

    /**************************************************
    Start sign in transaction.                                                               
    **************************************************/
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const users = this.usersRepository.create({
        password: usersInput.password,
      });
      await queryRunner.manager.save(users);

      const emails = this.emailsRepository.create({
        address: usersInput.email,
        user: users.id,
      });
      await queryRunner.manager.save(emails);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new Error('Transaction error!');
    } finally {
      await queryRunner.release();
    }
    /*************************************************/

    return {
      code: '0',
      message: 'success',
    };
  }
}
