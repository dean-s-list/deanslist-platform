import { ApiAuthGraphQLAdminGuard } from '@deanslist-platform/api-auth-data-access'
import {
  AdminFindManyRatingInput,
  AdminUpdateRatingInput,
  ApiRatingService,
  Rating,
} from '@deanslist-platform/api-rating-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiRatingAdminResolver {
  constructor(private readonly service: ApiRatingService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteRating(@Args('ratingId') ratingId: string) {
    return this.service.admin.deleteRating(ratingId)
  }

  @Query(() => [Rating])
  adminFindManyRating(@Args('input') input: AdminFindManyRatingInput) {
    return this.service.admin.findManyRating(input)
  }

  @Mutation(() => Rating, { nullable: true })
  adminUpdateRating(@Args('ratingId') ratingId: string, @Args('input') input: AdminUpdateRatingInput) {
    return this.service.admin.updateRating(ratingId, input)
  }
}
