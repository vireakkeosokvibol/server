import { Injectable } from '@nestjs/common';
import { SessionsType, SessionsInput } from './sessions.type';

@Injectable()
export class SessionsService {
  async validate(sessionsInput: SessionsInput): Promise<SessionsType> {
    return { expired: true };
  }
}
