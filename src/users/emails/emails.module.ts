import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsEntity } from './emails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailsEntity])],
})
export class EmailsModule {}
