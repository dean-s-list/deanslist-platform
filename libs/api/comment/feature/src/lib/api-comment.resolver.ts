import { ApiCommentService, Comment } from '@deanslist-platform/api-comment-data-access'
import { calculateAverage } from '@deanslist-platform/api-review-data-access'
import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Comment)
export class ApiCommentResolver {
  constructor(private readonly service: ApiCommentService) {}

  @ResolveField(() => Float, { nullable: true })
  ratingAverage(@Parent() comment: Comment) {
    return calculateAverage(comment.ratings ?? [])
  }
}
