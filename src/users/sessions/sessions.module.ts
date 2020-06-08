import { Module } from '@nestjs/common';
import { SessionsResolver } from './sessions.resolver';
import { PubSub } from 'graphql-subscriptions';
import { PubsubModule } from 'src/pubsub/pubsub.module';
import { SessionsService } from './sessions.service';

@Module({
  imports: [PubsubModule],
  providers: [SessionsResolver, SessionsService],
})
export class SessionsModule {}
