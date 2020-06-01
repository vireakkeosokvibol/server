import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersObject, UsersInput } from './users.type';
import { UsersService } from './users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  async root(): Promise<string> {
    return 'testing';
  }

  @Mutation(() => UsersObject)
  async users(@Args('signup') usersData: UsersInput): Promise<UsersObject> {
    return this.usersService.signup(usersData);
  }
}
