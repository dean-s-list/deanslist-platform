import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import { ApiReviewService, Review, UserFindManyReviewInput } from '@deanslist-platform/api-review-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiReviewUserResolver {
  constructor(private readonly service: ApiReviewService) {}

  @Mutation(() => Review, { nullable: true })
  userCreateReview(@CtxUserId() userId: string, @Args('projectId') projectId: string) {
    return this.service.user.createReview(userId, projectId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteReview(@CtxUserId() userId: string, @Args('reviewId') reviewId: string) {
    return this.service.user.deleteReview(userId, reviewId)
  }

  @Query(() => [Review], { nullable: true })
  userFindManyReview(@Args('input') input: UserFindManyReviewInput) {
    return this.service.user.findManyReview(input)
  }

  @Query(() => Review, { nullable: true })
  userFindOneReview(@Args('reviewId') reviewId: string) {
    return this.service.user.findOneReview(reviewId)
  }

  @Query(() => Review, { nullable: true })
  userFindUserProjectReview(@CtxUserId() userId: string, @Args('projectId') projectId: string) {
    return this.service.user.findUserProjectReview(userId, projectId)
  }
}
