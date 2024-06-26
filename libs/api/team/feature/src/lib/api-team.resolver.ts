import { ApiTeamService, Team } from '@deanslist-platform/api-team-data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Project, ProjectStatus } from '@prisma/client'

@Resolver(() => Team)
export class ApiTeamResolver {
  constructor(private readonly service: ApiTeamService) {}

  @ResolveField(() => Int, { nullable: true })
  activeProjectsCount(@Parent() team: Team) {
    const projects: Project[] = (team.projects ?? []) as Project[]

    return projects.filter((project) => project.status === ProjectStatus.Active)?.length
  }

  @ResolveField(() => Int, { nullable: true })
  memberCount(@Parent() team: Team) {
    return team.members?.length ?? 0
  }

  @ResolveField(() => String)
  viewUrl(@Parent() team: Team) {
    return `/management/teams/${team.id}`
  }
}
