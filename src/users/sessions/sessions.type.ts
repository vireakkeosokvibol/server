import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class SessionsType{
  @Field()
  readonly id: string;
}

@InputType()
export class SessionsInput {
  @Field()
  readonly id: string;
}