import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { UsersSignupInput, UsersObject } from './users.type';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository, getConnection } from 'typeorm';
import { TelsEntity } from './tels/tels.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(TelsEntity)
    private telsRepository: Repository<TelsEntity>,
  ) {}

  async signup(usersSignupInput: UsersSignupInput): Promise<UsersObject> {
    /*********************************************************
    Start hash password.                                                               
    *********************************************************/
    let sha256Password: string;
    let bcryptPassword: string;

    try {
      sha256Password = crypto
        .createHmac('sha256', usersSignupInput.password)
        .digest('base64'); // Encode result to base64.
      bcryptPassword = await bcrypt.hash(sha256Password, 12);
    } catch (error) {
      throw new Error('Password hashing error!');
    }
    /********************************************************/

    /**************************************************
    Start create users transaction.                                                               
    **************************************************/
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const users = this.usersRepository.create({
        password: bcryptPassword,
      });
      await queryRunner.manager.save(users);

      const emails = this.telsRepository.create({
        number: usersSignupInput.tel,
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
