import { Module } from '@nestjs/common';
import { SessionsResolver } from './sessions.resolver';
import { PubSub } from 'graphql-subscriptions';
import { PubsubModule } from 'src/pubsub/pubsub.module';

@Module({
  imports: [PubsubModule],
  providers: [SessionsResolver],
})
export class SessionsModule {}
