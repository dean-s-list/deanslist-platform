import { ApiAuthGraphQLAdminGuard } from '@deanslist-platform/api-auth-data-access'
import {
  AdminFindManyReviewInput,
  ApiReviewService,
  Review,
  ReviewPaging,
} from '@deanslist-platform/api-review-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiReviewAdminResolver {
  constructor(private readonly service: ApiReviewService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteReview(@Args('reviewId') reviewId: string) {
    return this.service.admin.deleteReview(reviewId)
  }

  @Query(() => ReviewPaging)
  adminFindManyReview(@Args('input') input: AdminFindManyReviewInput) {
    return this.service.admin.findManyReview(input)
  }

  @Query(() => Review, { nullable: true })
  adminFindOneReview(@Args('reviewId') reviewId: string) {
    return this.service.admin.findOneReview(reviewId)
  }
}
