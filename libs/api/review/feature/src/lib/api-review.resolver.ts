import { ApiReviewService, Review } from '@deanslist-platform/api-review-data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Review)
export class ApiReviewResolver {
  constructor(private readonly service: ApiReviewService) {}

  @ResolveField(() => String)
  name(@Parent() review: Review) {
    return `${review.project?.name} review by ${review.reviewer?.username}`
  }

  @ResolveField(() => String)
  viewUrl(@Parent() review: Review) {
    return `/projects/${review.projectId}/reviews/${review.id}`
  }
}
