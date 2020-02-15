import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class CatDto {
  @Field()
  readonly name: string;

  @Field(() => Int)
  readonly age: number;

}
