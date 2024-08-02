import { getRatingAverage, getRatingsFromReview } from '@deanslist-platform/api-project-data-access'
import { ApiReviewService, Review } from '@deanslist-platform/api-review-data-access'
import { Float, Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Review)
export class ApiReviewResolver {
  constructor(private readonly service: ApiReviewService) {}

  @ResolveField(() => String)
  name(@Parent() review: Review) {
    return `${review.projectMember?.project?.name} review by ${review.projectMember?.user?.username}`
  }

  @ResolveField(() => Int, { nullable: true })
  commentCount(@Parent() review: Review) {
    return review.comments?.length ?? 0
  }

  @ResolveField(() => Float, { nullable: true })
  ratingAverage(@Parent() review: Review) {
    return getRatingAverage(getRatingsFromReview(review).map((rating) => rating.rating))
  }

  @ResolveField(() => Int, { nullable: true })
  ratingCount(@Parent() review: Review) {
    return getRatingsFromReview(review).length
  }

  @ResolveField(() => String)
  viewUrl(@Parent() review: Review) {
    return `/projects/${review.projectMember?.projectId}/reviews/${review.id}`
  }
}
