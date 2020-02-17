import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { EmailModule } from './email/email.module';

@Module({
  providers: [UserService, UserResolver],
  imports: [TypeOrmModule.forFeature([UserEntity]), EmailModule],
})
export class UserModule {}
