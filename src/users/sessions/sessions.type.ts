import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class SessionsType {
  @Field()
  readonly expired: boolean;
}

@InputType()
export class SessionsInput {
  @Field()
  readonly token: string;
}
