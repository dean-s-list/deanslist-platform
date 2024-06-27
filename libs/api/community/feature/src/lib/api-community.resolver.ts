import { ApiCommunityService, Community } from '@deanslist-platform/api-community-data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Project, ProjectStatus } from '@prisma/client'

@Resolver(() => Community)
export class ApiCommunityResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @ResolveField(() => Int, { nullable: true })
  activeProjectsCount(@Parent() community: Community) {
    const projects: Project[] = (community.projects ?? []) as Project[]

    return projects.filter((project) => project.status === ProjectStatus.Active)?.length
  }

  @ResolveField(() => Int, { nullable: true })
  memberCount(@Parent() community: Community) {
    return community.members?.length ?? 0
  }

  @ResolveField(() => String)
  viewUrl(@Parent() community: Community) {
    return `/communities/${community.id}`
  }
}
