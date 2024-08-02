import { ProjectMember } from '@deanslist-platform/api-project-data-access'
import { Review } from '@deanslist-platform/api-review-data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => ProjectMember)
export class ApiProjectMemberResolver {
  @ResolveField(() => Review, { nullable: true })
  review(@Parent() member: ProjectMember) {
    return member.review
  }
}
