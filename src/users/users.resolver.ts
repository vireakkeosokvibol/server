import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersObject, UsersSignupInput } from './users.type';
import { UsersService } from './users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  async root(): Promise<string> {
    return 'testing';
  }

  @Mutation(() => UsersObject)
  async usersSignup(
    @Args('input') usersData: UsersSignupInput,
  ): Promise<UsersObject> {
    return this.usersService.signup(usersData);
  }
}
