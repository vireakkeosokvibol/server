import { Resolver, Query } from '@nestjs/graphql';
import { CatDto } from './cat.dto';

@Resolver('Cat')
export class CatResolver {
  @Query(() => [CatDto])
  async show(): Promise<CatDto[]>{
    return [
      {name: 'katty', age: 12},
      {name: 'tome', age: 13}
    ]
  }
}
