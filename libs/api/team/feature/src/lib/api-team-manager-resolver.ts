import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiTeamService,
  ManagerCreateTeamInput,
  ManagerFindManyTeamInput,
  ManagerUpdateTeamInput,
  Team,
  TeamMember,
  TeamPaging,
} from '@deanslist-platform/api-team-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiTeamManagerResolver {
  constructor(private readonly service: ApiTeamService) {}

  @Mutation(() => Boolean, { nullable: true })
  managerAddTeamMember(@CtxUserId() userId: string, @Args('teamId') teamId: string, @Args('userId') memberId: string) {
    return this.service.manager.addTeamMember(userId, teamId, memberId)
  }

  @Mutation(() => Team, { nullable: true })
  managerCreateTeam(@CtxUserId() userId: string, @Args('input') input: ManagerCreateTeamInput) {
    return this.service.manager.createTeam(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerDeleteTeam(@CtxUserId() userId: string, @Args('teamId') teamId: string) {
    return this.service.manager.deleteTeam(userId, teamId)
  }

  @Query(() => [TeamMember], { nullable: true })
  managerGetTeamMembers(@Args('teamId') teamId: string) {
    return this.service.manager.getTeamMembers(teamId)
  }

  @Query(() => TeamMember, { nullable: true })
  managerGetTeamMember(@CtxUserId() userId: string, @Args('teamId') teamId: string) {
    return this.service.manager.getTeamMember(userId, teamId)
  }

  @Query(() => TeamPaging)
  managerFindManyTeam(@Args('input') input: ManagerFindManyTeamInput) {
    return this.service.manager.findManyTeam(input)
  }

  @Query(() => Team, { nullable: true })
  managerFindOneTeam(@Args('teamId') teamId: string) {
    return this.service.manager.findOneTeam(teamId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerRemoveTeamMember(
    @CtxUserId() userId: string,
    @Args('teamId') teamId: string,
    @Args('userId') memberId: string,
  ) {
    return this.service.manager.removeTeamMember(userId, teamId, memberId)
  }
  @Mutation(() => Boolean, { nullable: true })
  managerToggleTeamAdmin(
    @CtxUserId() userId: string,
    @Args('teamId') teamId: string,
    @Args('userId') memberId: string,
  ) {
    return this.service.manager.toggleTeamAdmin(userId, teamId, memberId)
  }

  @Mutation(() => Team, { nullable: true })
  managerUpdateTeam(
    @CtxUserId() userId: string,
    @Args('teamId') teamId: string,
    @Args('input') input: ManagerUpdateTeamInput,
  ) {
    return this.service.manager.updateTeam(userId, teamId, input)
  }
}
