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

  async create(usersData: UsersInput): Promise<UsersObject> {
    let result: UsersObject = {
      code: '0',
      message: 'success',
    };

    try {
      const users = this.usersRepository.create(usersData);
      await this.usersRepository.save(users);
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Username already existed!');
      }
    }

    return result;
  }
}
