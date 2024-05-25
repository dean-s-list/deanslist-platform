import { getEndDate } from '@deanslist-platform/api-core-data-access'
import { ApiProjectService, Project } from '@deanslist-platform/api-project-data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Project)
export class ApiProjectResolver {
  constructor(private readonly service: ApiProjectService) {}
  @ResolveField(() => Date, { nullable: true })
  endDate(@Parent() { duration, startDate }: Project) {
    return getEndDate({ duration, startDate })
  }

  @ResolveField(() => String)
  viewUrl(@Parent() project: Project) {
    return `/projects/${project.id}`
  }
}
