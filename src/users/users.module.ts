import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { TelsEntity } from 'src/users/tels/tels.entity';
import { SessionsEntity } from './sessions/sessions.entity';
import { SessionsModule } from './sessions/sessions.module';
import { TelsModule } from './tels/tels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, TelsEntity, SessionsEntity]),
    SessionsModule,
    TelsModule,
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
