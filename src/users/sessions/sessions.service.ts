import { Injectable, Inject } from '@nestjs/common';
import { SessionsType, SessionsInput } from './sessions.type';
import { getManager } from 'typeorm';
import { SessionsEntity } from './sessions.entity';

@Injectable()
export class SessionsService {
  async signout(sessionsInput): Promise<void> {
    const token: { id: string } = JSON.parse(
      Buffer.from(sessionsInput.token, 'base64').toString(),
    );

    const entityManager = getManager();
    const sessions = await entityManager.findOne(SessionsEntity, {
      id: token['session'],
      expired: false,
    });

    sessions.expired = true;
    await entityManager.save(sessions);
  }

  async validate(sessionsInput: SessionsInput): Promise<SessionsType> {
    const token: { id: string } = JSON.parse(
      Buffer.from(sessionsInput.token, 'base64').toString(),
    );

    const entityManager = getManager();
    const sessions = await entityManager.findOne(SessionsEntity, {
      id: token.id,
      expired: false,
    });

    if (sessions === undefined) {
      return { expired: true };
    }

    return { expired: false };
  }
}
