import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersInput, UsersObject } from './users.type';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(usersInput: UsersInput): Promise<UsersObject> {
    /******************************************************
    // Set default vaolue for output result.
    *****/
    let result: UsersObject = {
      code: '0',
      message: 'success',
    };
    // ******************************************************

    /************************************************************************************
    Start hash password.                                                               
    ************************************************************************************/
    let sha256Password: string; // Hashed password with sha256
    let bcryptPassword: string; // Hashed password with sha

    try {
      sha256Password = crypto
        .createHmac('sha256', usersInput.password)
        .digest('base64');
      bcryptPassword = await bcrypt.hash(sha256Password, 12);
    } catch (error) {
      console.log(error)
      throw new Error('Password hashing error!');
    }
    /***********************************************************************************/

    try {
      const users = this.usersRepository.create({
        username: usersInput.username,
        password: bcryptPassword,
      });
      await this.usersRepository.save(users);
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Username already existed!');
      }
    }

    return result;
  }
}
