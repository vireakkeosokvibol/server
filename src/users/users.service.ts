import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersSignupInput, UsersObject, UsersSigninInput } from './users.type';
import { UsersEntity } from './users.entity';
import { TelsEntity } from './tels/tels.entity';
import { auth as Auth } from 'firebase-admin';
import { SessionsEntity } from './sessions/sessions.entity';
import { getManager } from 'typeorm';

@Injectable()
export class UsersService {
  constructor() { }

  async signup(usersSignupInput: UsersSignupInput): Promise<UsersObject> {
    /***************************************************************************
    Start verify firebase token.                                                               
    ***************************************************************************/

    try {
      await Auth().verifyIdToken(usersSignupInput.firebaseToken);
    } catch (error) {
      throw new Error(error);
    }
    /**************************************************************************/

    /*********************************************************
    Start hash password.                                                               
    *********************************************************/
    let sha256Password: string;
    let bcryptPassword: string;

    try {
      sha256Password = crypto
        .createHmac('sha256', usersSignupInput.password)
        .digest('base64'); // Encode result to base64.
      bcryptPassword = await bcrypt.hash(sha256Password, 12);
    } catch (error) {
      throw new Error('Password hashing error!');
    }
    /********************************************************/

    /**************************************************
    Start create users transaction.                                                               
    **************************************************/

    try {
      let token: string;

      await getManager().transaction(async transactionalEntityManager => {
        const usersEntity: UsersEntity = new UsersEntity();
        usersEntity.password = bcryptPassword;
        await transactionalEntityManager.save(usersEntity);

        const telsEntity: TelsEntity = new TelsEntity();
        telsEntity.address = usersSignupInput.tel;
        telsEntity.verified = true;
        telsEntity.primary = true;
        telsEntity.user = usersEntity;
        await transactionalEntityManager.save(telsEntity);

        const sessionsEntity: SessionsEntity = new SessionsEntity();
        sessionsEntity.user = usersEntity;
        await transactionalEntityManager.save(sessionsEntity);

        token = Buffer.from(JSON.stringify({ id: sessionsEntity.id })).toString(
          'base64',
        );
      });

      return {
        code: 0,
        token,
        message: 'success',
      };
    } catch (error) {
      console.log(error);
      throw new Error('Transaction error!');
    }
    /*************************************************/
  }

  async signin(usersInput: UsersSigninInput): Promise<UsersObject> {
    // return { message: '', code: 0, token: 'test' };
    throw new Error('incorrect password!');
  }
}
