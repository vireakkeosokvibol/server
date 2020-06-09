import { Injectable, Inject } from '@nestjs/common';
import { SessionsType, SessionsInput } from './sessions.type';
import { verify } from 'jsonwebtoken';
import { SECRET } from 'config.json';
import { getManager } from 'typeorm';
import { SessionsEntity } from './sessions.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class SessionsService {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}
  async validate(sessionsInput: SessionsInput): Promise<SessionsType> {
    const token = verify(sessionsInput.token, SECRET);

    const entityManager = getManager();
    const sessions = await entityManager.findOne(SessionsEntity, {
      id: token['session'],
      expired: false,
    });

    if (sessions === undefined) {
      this.pubSub.publish(sessionsInput.token, {
        [sessionsInput.token]: {[sessionsInput.token]: {expired: true}}
      })
      return { expired: true };
    }

    return { expired: false };
  }
}
