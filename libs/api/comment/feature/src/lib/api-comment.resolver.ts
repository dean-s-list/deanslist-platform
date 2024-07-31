import { ApiCommentService, Comment } from '@deanslist-platform/api-comment-data-access'
import { calculateProjectRatings } from '@deanslist-platform/api-project-data-access'
import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Rating as PrismaRating } from '@prisma/client'

@Resolver(() => Comment)
export class ApiCommentResolver {
  constructor(private readonly service: ApiCommentService) {}

  @ResolveField(() => Float, { nullable: true })
  ratingAverage(@Parent() comment: Comment) {
    return calculateProjectRatings((comment.ratings ?? []) as PrismaRating[])
  }
}
