import { calculateProjectRatings, ProjectRole } from '@deanslist-platform/api-project-data-access'
import { ApiReviewService, Review } from '@deanslist-platform/api-review-data-access'
import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Rating } from '@prisma/client'

@Resolver(() => Review)
export class ApiReviewResolver {
  constructor(private readonly service: ApiReviewService) {}

  @ResolveField(() => String)
  name(@Parent() review: Review) {
    return `${review.projectMember?.project?.name} review by ${review.projectMember?.user?.username}`
  }

  @ResolveField(() => Float, { nullable: true })
  ratingAverage(@Parent() review: Review) {
    const ratings: Rating[] = (review.comments?.map((comment) => comment.ratings).flat() ?? []) as Rating[]

    return calculateProjectRatings(ratings)
  }

  @ResolveField(() => Float, { nullable: true })
  ratingProgress(@Parent() review: Review) {
    const projectManagers = (review.projectMember?.project?.members ?? []).filter((i) => i.role === ProjectRole.Manager)
    const managerCount = projectManagers?.length ?? 0
    const commentCount = review.comments?.length ?? 0
    const ratingCount =
      review.comments?.map((comment) => comment.ratings?.length ?? 0).reduce((acc, count) => acc + count, 0) ?? 0

    const expectedRatings = managerCount * commentCount

    if (expectedRatings === 0) {
      return 0
    }

    if (ratingCount > expectedRatings) {
      return 100
    }

    // scale from 0 to 100 based on the ratingCount and expectedRatings
    return Math.round((ratingCount / expectedRatings) * 100)
  }

  @ResolveField(() => String)
  viewUrl(@Parent() review: Review) {
    return `/projects/${review.projectMember?.projectId}/reviews/${review.id}`
  }
}
