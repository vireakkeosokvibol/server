import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), EmailsModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
