import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class UsersObject {
  @Field()
  readonly code: string;

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
