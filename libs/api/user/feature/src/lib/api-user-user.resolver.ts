import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiUserService,
  User,
  UserFindManyUserInput,
  UserPaging,
  UserUpdateUserInput,
} from '@deanslist-platform/api-user-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserUserResolver {
  constructor(private readonly service: ApiUserService) {}

  @Query(() => UserPaging)
  userFindManyUser(@Args('input') input: UserFindManyUserInput) {
    return this.service.user.findManyUser(input)
  }

  @Query(() => User, { nullable: true })
  userFindOneUser(@Args('username') username: string) {
    return this.service.user.findByUsername(username)
  }

  @Mutation(() => User, { nullable: true })
  userUpdateUser(@CtxUserId() userId: string, @Args('input') input: UserUpdateUserInput) {
    return this.service.user.updateUser(userId as string, input)
  }
}
