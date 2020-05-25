import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { EmailsModule } from './emails/emails.module';
import { EmailsEntity } from './emails/emails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, EmailsEntity]),
    EmailsModule,
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
