import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true
    }),
    CatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
