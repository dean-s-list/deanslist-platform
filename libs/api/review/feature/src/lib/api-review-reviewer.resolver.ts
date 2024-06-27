import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiReviewService,
  Review,
  ReviewerFindManyReviewByProjectInput,
  ReviewerFindManyReviewByUsernameInput,
} from '@deanslist-platform/api-review-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiReviewReviewerResolver {
  constructor(private readonly service: ApiReviewService) {}

  @Mutation(() => Review, { nullable: true })
  reviewerCreateReview(@CtxUserId() userId: string, @Args('projectId') projectId: string) {
    return this.service.reviewer.createReview(userId, projectId)
  }

  @Mutation(() => Boolean, { nullable: true })
  reviewerDeleteReview(@CtxUserId() userId: string, @Args('reviewId') reviewId: string) {
    return this.service.reviewer.deleteReview(userId, reviewId)
  }

  @Query(() => [Review], { nullable: true })
  reviewerFindManyReviewByProject(@Args('input') input: ReviewerFindManyReviewByProjectInput) {
    return this.service.reviewer.findManyReviewByProject(input)
  }

  @Query(() => [Review], { nullable: true })
  reviewerFindManyReviewByUsername(@Args('input') input: ReviewerFindManyReviewByUsernameInput) {
    return this.service.reviewer.findManyReviewByUsername(input)
  }

  @Query(() => Review, { nullable: true })
  reviewerFindOneReview(@Args('reviewId') reviewId: string) {
    return this.service.reviewer.findOneReview(reviewId)
  }

  @Query(() => Review, { nullable: true })
  reviewerFindUserProjectReview(@CtxUserId() userId: string, @Args('projectId') projectId: string) {
    return this.service.reviewer.findUserProjectReview(userId, projectId)
  }
}
