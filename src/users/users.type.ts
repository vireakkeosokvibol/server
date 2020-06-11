import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class UsersObject {
  @Field()
  readonly code: number;

  @Field()
  readonly token: string;

  @Field()
  readonly message: string;
}

@InputType()
export class UsersSignupInput {
  @Field()
  readonly tel: string;

  @Field()
  readonly password: string;

  @Field()
  readonly firebaseToken: string;
}

@InputType()
export class UsersSigninInput {
  @Field()
  readonly account: string;

  @Field()
  readonly password: string
}