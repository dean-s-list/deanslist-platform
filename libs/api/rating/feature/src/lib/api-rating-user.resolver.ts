import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiRatingService,
  Rating,
  UserCreateRatingInput,
  UserFindManyRatingInput,
  UserUpdateRatingInput,
} from '@deanslist-platform/api-rating-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiRatingUserResolver {
  constructor(private readonly service: ApiRatingService) {}

  @Mutation(() => Rating, { nullable: true })
  userCreateRating(@CtxUserId() userId: string, @Args('input') input: UserCreateRatingInput) {
    return this.service.user.createRating(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteRating(@CtxUserId() userId: string, @Args('ratingId') ratingId: string) {
    return this.service.user.deleteRating(userId, ratingId)
  }

  @Query(() => [Rating])
  userFindManyRating(@Args('input') input: UserFindManyRatingInput) {
    return this.service.user.findManyRating(input)
  }

  @Mutation(() => Rating, { nullable: true })
  userUpdateRating(
    @CtxUserId() userId: string,
    @Args('ratingId') ratingId: string,
    @Args('input') input: UserUpdateRatingInput,
  ) {
    return this.service.user.updateRating(userId, ratingId, input)
  }
}
