import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiCommentService,
  Comment,
  ReviewerCreateCommentInput,
  ReviewerFindManyCommentInput,
  ReviewerUpdateCommentInput,
} from '@deanslist-platform/api-comment-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiCommentReviewerResolver {
  constructor(private readonly service: ApiCommentService) {}

  @Mutation(() => Comment, { nullable: true })
  reviewerCreateComment(@CtxUserId() userId: string, @Args('input') input: ReviewerCreateCommentInput) {
    return this.service.reviewer.createComment(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  reviewerDeleteComment(@Args('commentId') commentId: string) {
    return this.service.reviewer.deleteComment(commentId)
  }

  @Query(() => [Comment], { nullable: true })
  reviewerFindManyComment(@Args('input') input: ReviewerFindManyCommentInput) {
    return this.service.reviewer.findManyComment(input)
  }

  @Mutation(() => Comment, { nullable: true })
  reviewerUpdateComment(@Args('commentId') commentId: string, @Args('input') input: ReviewerUpdateCommentInput) {
    return this.service.reviewer.updateComment(commentId, input)
  }
}
