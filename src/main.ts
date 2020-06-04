import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as Firebase from 'firebase-admin';
import { FIREBASE } from 'config.json';

async function bootstrap() {
  Firebase.initializeApp({
    credential: Firebase.credential.cert({
      clientEmail: FIREBASE.client_email,
      privateKey: FIREBASE.private_key,
      projectId: FIREBASE.project_id,
    }),
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
