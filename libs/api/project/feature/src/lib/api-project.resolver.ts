import { getRemainingDays, Project } from '@deanslist-platform/api-project-data-access'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Project)
export class ApiProjectResolver {
  @ResolveField(() => Int, { nullable: true })
  remainingDays(@Parent() project: Project) {
    return project.endDate ? getRemainingDays(project.endDate) : 0
  }

  @ResolveField(() => Int, { nullable: true })
  reviewCount(@Parent() project: Project) {
    const filtered = project.reviews?.filter((r) => r.comments?.length ?? 0 > 0)

    return filtered?.length ?? 0
  }

  @ResolveField(() => String)
  manageUrl(@Parent() project: Project) {
    return `/manager/projects/${project.id}`
  }

  @ResolveField(() => String)
  viewUrl(@Parent() project: Project) {
    return `/projects/${project.id}`
  }
}
