import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class UsersObject {
  @Field()
  code: string;

  @Field()
  message: string;
}

@InputType()
export class UsersSignupInput {
  @Field()
  readonly tel: string;

  @Field()
  readonly password: string;

  @Field()
  readonly verificationId: string;
}
