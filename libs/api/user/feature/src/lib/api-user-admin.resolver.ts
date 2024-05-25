import { ApiAuthGraphQLAdminGuard } from '@deanslist-platform/api-auth-data-access'
import {
  AdminCreateUserInput,
  AdminFindManyUserInput,
  AdminUpdateUserInput,
  ApiUserService,
  User,
  UserPaging,
} from '@deanslist-platform/api-user-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiUserAdminResolver {
  constructor(private readonly service: ApiUserService) {}

  @Mutation(() => User, { nullable: true })
  adminCreateUser(@Args('input') input: AdminCreateUserInput) {
    return this.service.admin.createUser(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteUser(@Args('userId') userId: string) {
    return this.service.admin.deleteUser(userId)
  }

  @Query(() => UserPaging)
  adminFindManyUser(@Args('input') input: AdminFindManyUserInput) {
    return this.service.admin.findManyUser(input)
  }

  @Query(() => User, { nullable: true })
  adminFindOneUser(@Args('userId') userId: string) {
    return this.service.admin.findById(userId)
  }

  @Mutation(() => User, { nullable: true })
  adminUpdateUser(@Args('userId') userId: string, @Args('input') input: AdminUpdateUserInput) {
    return this.service.admin.updateUser(userId, input)
  }
}
