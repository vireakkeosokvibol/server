import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersObject, UsersSignupInput, UsersSigninInput } from './users.type';
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
    @Args('input') usersInput: UsersSignupInput,
  ): Promise<UsersObject> {
    return this.usersService.signup(usersInput);
  }

  @Mutation(() => UsersObject)
  async usersSignin(@Args('input') usersSignin: UsersSigninInput): Promise<UsersObject> {
    return this.usersService.signin(usersSignin);
  }
}
