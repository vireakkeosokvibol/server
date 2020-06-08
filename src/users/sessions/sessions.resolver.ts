import { Resolver, Subscription, Query, Args } from '@nestjs/graphql';
import { SessionsType, SessionsInput } from './sessions.type';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Resolver('Sessions')
export class SessionsResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSub,
    private sessionsService: SessionsService,
  ) {}

  @Query(() => SessionsType)
  async session(
    @Args('token') sessionsInput: SessionsInput,
  ): Promise<SessionsType> {
    return this.sessionsService.validate(sessionsInput);
  }

  @Subscription(() => SessionsType)
  async subscriptionData(
    @Args('token') sessionsData: SessionsInput,
  ): Promise<any> {
    return this.pubSub.asyncIterator(sessionsData.id);
  }
}