import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { TelsEntity } from 'src/tels/tels.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, TelsEntity]),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
