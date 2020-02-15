import { Resolver, Query } from '@nestjs/graphql';
import { CatService } from './cat.service';
import { CatDto } from './cat.dto';


@Resolver('Cat')
export class CatResolver {

  constructor(
    private readonly catService: CatService,
  ) { }

  @Query(() => [CatDto])
  async show(): Promise<CatDto[]> {
    return this.catService.show()
  }
}
