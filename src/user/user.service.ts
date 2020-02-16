import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserInput } from './user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(UserData: UserInput) {
    const createUser = this.userRepository.create(UserData);
    return await this.userRepository.save(createUser);
  }

  async select() {
    return await this.userRepository.find()
  }
}
