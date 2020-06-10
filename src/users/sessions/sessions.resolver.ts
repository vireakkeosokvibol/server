import { Resolver, Subscription, Query, Args, Mutation } from '@nestjs/graphql';
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
  async usersSessions(
    @Args('validate') sessionsInput: SessionsInput,
  ): Promise<SessionsType> {
    return this.sessionsService.validate(sessionsInput);
  }

  @Mutation(() => SessionsType)
  async userSessionsSignout(
    @Args('input') sessionsInput: SessionsInput,
  ): Promise<SessionsType> {
    this.pubSub.publish(sessionsInput.token, {
      ['subscriptionData']: {expired: true}
    })
    return { expired: true };
  }

  @Subscription(() => SessionsType)
  async subscriptionData(
    @Args('input') sessionsData: SessionsInput,
  ): Promise<any> {
    return this.pubSub.asyncIterator(sessionsData.token);
  }
}
