import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UserInput } from './user.input';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserDto])
  async select() {
    return this.userService.select()
  }

  @Mutation(() => UserDto)
  async create(@Args('userInput') userInput: UserInput) {
    return this.userService.create(userInput);
  }
}
