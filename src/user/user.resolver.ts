import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UserInput } from './user.input';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserDto])
  async select(): Promise<UserDto[]> {
    return await this.userService.select();
  }

  @Mutation(() => UserDto)
  async create(@Args('userInput') userInput: UserInput): Promise<UserInput> {
    return await this.userService.create(userInput);
  }
}
