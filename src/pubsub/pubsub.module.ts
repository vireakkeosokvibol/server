import { Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';
import { REDIS } from 'config.json';

@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useFactory: () => {
        return new RedisPubSub({
          publisher: new Redis(REDIS),
          subscriber: new Redis(REDIS),
        });
      },
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubsubModule {}
