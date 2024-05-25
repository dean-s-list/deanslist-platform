import { ApiAuthGraphQLAdminGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  AdminFindManyTeamInput,
  AdminUpdateTeamInput,
  ApiTeamService,
  Team,
  TeamMember,
  TeamPaging,
} from '@deanslist-platform/api-team-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiTeamAdminResolver {
  constructor(private readonly service: ApiTeamService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminAddTeamMember(@CtxUserId() userId: string, @Args('teamId') teamId: string, @Args('userId') memberId: string) {
    return this.service.data.addTeamMember(userId, teamId, memberId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteTeam(@CtxUserId() userId: string, @Args('teamId') teamId: string) {
    return this.service.data.deleteTeam(userId, teamId)
  }

  @Query(() => [TeamMember], { nullable: true })
  adminGetTeamMembers(@Args('teamId') teamId: string) {
    return this.service.data.getTeamMembers(teamId)
  }

  @Query(() => TeamPaging)
  adminFindManyTeam(@Args('input') input: AdminFindManyTeamInput) {
    return this.service.admin.findManyTeam(input)
  }

  @Query(() => Team, { nullable: true })
  adminFindOneTeam(@Args('teamId') teamId: string) {
    return this.service.data.findOneTeam(teamId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminRemoveTeamMember(@CtxUserId() userId: string, @Args('teamId') teamId: string, @Args('userId') memberId: string) {
    return this.service.data.removeTeamMember(userId, teamId, memberId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminToggleTeamAdmin(@CtxUserId() userId: string, @Args('teamId') teamId: string, @Args('userId') memberId: string) {
    return this.service.data.toggleTeamAdmin(userId, teamId, memberId)
  }
  @Mutation(() => Team, { nullable: true })
  adminUpdateTeam(@Args('teamId') teamId: string, @Args('input') input: AdminUpdateTeamInput) {
    return this.service.data.updateTeam(teamId, input)
  }
}
