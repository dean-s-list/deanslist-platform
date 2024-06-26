import { ApiAuthGraphQLUserGuard } from '@deanslist-platform/api-auth-data-access'
import { ApiTeamService, Team, TeamPaging, UserFindManyTeamInput } from '@deanslist-platform/api-team-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiTeamUserResolver {
  constructor(private readonly service: ApiTeamService) {}

  @Query(() => TeamPaging)
  userFindManyTeam(@Args('input') input: UserFindManyTeamInput) {
    return this.service.user.findManyTeam(input)
  }

  @Query(() => Team, { nullable: true })
  userFindOneTeam(@Args('teamId') teamId: string) {
    return this.service.user.findOneTeam(teamId)
  }
}
