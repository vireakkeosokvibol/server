import { Injectable } from '@nestjs/common';
import { SessionsType, SessionsInput } from './sessions.type';
import { verify } from 'jsonwebtoken';
import { SECRET } from 'config.json';
import { getManager } from 'typeorm';
import { SessionsEntity } from './sessions.entity';

@Injectable()
export class SessionsService {
  async validate(sessionsInput: SessionsInput): Promise<SessionsType> {
    const token = verify(sessionsInput.token, SECRET);

    const entityManager = getManager();
    const sessions = await entityManager.findOne(SessionsEntity, {
      id: token['session'],
      expired: false,
    });

    if (sessions === undefined) {
      return { expired: true };
    }

    return { expired: false };
  }
}
