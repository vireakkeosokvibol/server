import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersSignupInput, UsersObject } from './users.type';
import { UsersEntity } from './users.entity';
import { getConnection } from 'typeorm';
import { TelsEntity } from './tels/tels.entity';
import { auth as Auth } from 'firebase-admin';
import { SessionsEntity } from './sessions/sessions.entity';
import { sign } from 'jsonwebtoken';
import { SECRET } from 'config.json';

@Injectable()
export class UsersService {
  constructor() {}

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
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const usersEntity: UsersEntity = new UsersEntity();
      usersEntity.password = bcryptPassword;
      await queryRunner.manager.save(usersEntity);

      const telsEntity: TelsEntity = new TelsEntity();
      telsEntity.address = usersSignupInput.tel;
      telsEntity.verified = true;
      telsEntity.primary = true;
      telsEntity.user = usersEntity;
      await queryRunner.manager.save(telsEntity);

      const sessionsEntity: SessionsEntity = new SessionsEntity();
      sessionsEntity.user = usersEntity;
      await queryRunner.manager.save(sessionsEntity);

      await queryRunner.commitTransaction();

      const token: string = sign({ session: sessionsEntity.id }, SECRET);

      return {
        code: '0',
        token: token,
        message: 'success',
      };
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new Error('Transaction error!');
    } finally {
      await queryRunner.release();
    }
    /*************************************************/
  }
}
