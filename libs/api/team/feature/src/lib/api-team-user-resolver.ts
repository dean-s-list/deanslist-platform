import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiTeamService,
  Team,
  TeamMember,
  TeamPaging,
  UserCreateTeamInput,
  UserFindManyTeamInput,
  UserUpdateTeamInput,
} from '@deanslist-platform/api-team-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiTeamUserResolver {
  constructor(private readonly service: ApiTeamService) {}

  @Mutation(() => Boolean, { nullable: true })
  userAddTeamMember(@CtxUserId() userId: string, @Args('teamId') teamId: string, @Args('userId') memberId: string) {
    return this.service.user.addTeamMember(userId, teamId, memberId)
  }

  @Mutation(() => Team, { nullable: true })
  userCreateTeam(@CtxUserId() userId: string, @Args('input') input: UserCreateTeamInput) {
    return this.service.user.createTeam(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteTeam(@CtxUserId() userId: string, @Args('teamId') teamId: string) {
    return this.service.user.deleteTeam(userId, teamId)
  }

  @Query(() => [TeamMember], { nullable: true })
  userGetTeamMembers(@Args('teamId') teamId: string) {
    return this.service.user.getTeamMembers(teamId)
  }

  @Query(() => TeamMember, { nullable: true })
  userGetTeamMember(@CtxUserId() userId: string, @Args('teamId') teamId: string) {
    return this.service.user.getTeamMember(userId, teamId)
  }

  @Query(() => TeamPaging)
  userFindManyTeam(@Args('input') input: UserFindManyTeamInput) {
    return this.service.user.findManyTeam(input)
  }

  @Query(() => Team, { nullable: true })
  userFindOneTeam(@Args('teamId') teamId: string) {
    return this.service.user.findOneTeam(teamId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userRemoveTeamMember(@CtxUserId() userId: string, @Args('teamId') teamId: string, @Args('userId') memberId: string) {
    return this.service.user.removeTeamMember(userId, teamId, memberId)
  }
  @Mutation(() => Boolean, { nullable: true })
  userToggleTeamAdmin(@CtxUserId() userId: string, @Args('teamId') teamId: string, @Args('userId') memberId: string) {
    return this.service.user.toggleTeamAdmin(userId, teamId, memberId)
  }

  @Mutation(() => Team, { nullable: true })
  userUpdateTeam(
    @CtxUserId() userId: string,
    @Args('teamId') teamId: string,
    @Args('input') input: UserUpdateTeamInput,
  ) {
    return this.service.user.updateTeam(userId, teamId, input)
  }
}
