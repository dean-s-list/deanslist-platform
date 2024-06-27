import { getEndDate } from '@deanslist-platform/api-core-data-access'
import { ApiProjectService, Project } from '@deanslist-platform/api-project-data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Project)
export class ApiProjectResolver {
  constructor(private readonly service: ApiProjectService) {}
  @ResolveField(() => Date, { nullable: true })
  endDate(@Parent() { duration, startDate }: Project) {
    return getEndDate({ duration, startDate })
  }

  @ResolveField(() => Int, { nullable: true })
  reviewCount(@Parent() project: Project) {
    const filtered = project.reviews?.filter((r) => r.comments?.length ?? 0 > 0)

    return filtered?.length ?? 0
  }

  @ResolveField(() => String)
  manageUrl(@Parent() project: Project) {
    return `/management/communities/${project.communityId}/projects/${project.id}`
  }

  @ResolveField(() => String)
  viewUrl(@Parent() project: Project) {
    return `/projects/${project.id}`
  }
}
