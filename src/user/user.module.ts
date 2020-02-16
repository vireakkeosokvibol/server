import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserService, UserResolver],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
