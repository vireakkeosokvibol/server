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
  async userSessionsValidate(
    @Args('input') sessionsInput: SessionsInput,
  ): Promise<SessionsType> {
    return this.sessionsService.validate(sessionsInput);
  }

  @Mutation(() => SessionsType)
  async userSessionsSignout(
    @Args('input') sessionsInput: SessionsInput,
  ): Promise<SessionsType> {
    this.sessionsService.signout(sessionsInput);
    this.pubSub.publish(sessionsInput.token, {
      ['userSessionsSubscription']: { expired: true },
    });
    return { expired: true };
  }

  @Subscription(() => SessionsType)
  async userSessionsSubscription(
    @Args('input') sessionsData: SessionsInput,
  ): Promise<any> {
    return this.pubSub.asyncIterator(sessionsData.token);
  }
}
