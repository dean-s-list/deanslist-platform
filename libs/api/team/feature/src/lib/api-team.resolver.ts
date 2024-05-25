import { ApiTeamService, Team } from '@deanslist-platform/api-team-data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Team)
export class ApiTeamResolver {
  constructor(private readonly service: ApiTeamService) {}

  @ResolveField(() => String)
  viewUrl(@Parent() team: Team) {
    return `/teams/${team.id}`
  }
}
