import { Injectable } from '@nestjs/common';
import { CatDto } from './cat.dto';

@Injectable()
export class CatService {
  async show(): Promise<CatDto[]> {
    return [
      {name: 'tom', age: 12},
      {name: 'katty', age: 13}
    ]
  }
}
