import { Resolver, Subscription, Query, Args } from '@nestjs/graphql';
import { SessionsType, SessionsInput } from './sessions.type';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver('Sessions')
export class SessionsResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}

  @Query(() => SessionsType)
  async addData(): Promise<SessionsType> {
    this.pubSub.publish('subscription', {
      subscriptionData: { id: 'test' },
    });
    return { id: 'test' };
  }

  @Subscription(() => SessionsType)
  async subscriptionData(@Args('token') sessionsData: SessionsInput): Promise<any> {
    return this.pubSub.asyncIterator(sessionsData.id);
  }
}
