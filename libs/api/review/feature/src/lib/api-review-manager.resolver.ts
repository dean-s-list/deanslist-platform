import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiReviewService,
  ManagerFindManyReviewByProjectInput,
  ManagerUpdateReviewInput,
  Review,
} from '@deanslist-platform/api-review-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiReviewManagerResolver {
  constructor(private readonly service: ApiReviewService) {}

  @Query(() => [Review], { nullable: true })
  managerFindManyReviewByProject(@Args('input') input: ManagerFindManyReviewByProjectInput) {
    return this.service.manager.findManyReviewByProject(input)
  }

  @Mutation(() => Review, { nullable: true })
  managerUpdateReview(
    @CtxUserId() userId: string,
    @Args('reviewId') reviewId: string,
    @Args('input') input: ManagerUpdateReviewInput,
  ) {
    return this.service.manager.updateReview(userId, reviewId, input)
  }
}
