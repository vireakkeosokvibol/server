import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class UsersObject {
  @Field()
  code: string;

  @Field()
  message: string;
}

@InputType()
export class UsersInput {
  @Field()
  readonly tel: string;

  @Field()
  readonly password: string;
}
