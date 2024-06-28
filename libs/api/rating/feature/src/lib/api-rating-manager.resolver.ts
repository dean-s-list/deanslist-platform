import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiRatingService,
  ManagerCreateRatingInput,
  ManagerFindManyRatingInput,
  ManagerUpdateRatingInput,
  Rating,
} from '@deanslist-platform/api-rating-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiRatingManagerResolver {
  constructor(private readonly service: ApiRatingService) {}

  @Mutation(() => Rating, { nullable: true })
  managerCreateRating(@CtxUserId() userId: string, @Args('input') input: ManagerCreateRatingInput) {
    return this.service.manager.createRating(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerDeleteRating(@CtxUserId() userId: string, @Args('ratingId') ratingId: string) {
    return this.service.manager.deleteRating(userId, ratingId)
  }

  @Query(() => [Rating])
  managerFindManyRating(@Args('input') input: ManagerFindManyRatingInput) {
    return this.service.manager.findManyRating(input)
  }

  @Mutation(() => Rating, { nullable: true })
  managerUpdateRating(
    @CtxUserId() userId: string,
    @Args('ratingId') ratingId: string,
    @Args('input') input: ManagerUpdateRatingInput,
  ) {
    return this.service.manager.updateRating(userId, ratingId, input)
  }
}
