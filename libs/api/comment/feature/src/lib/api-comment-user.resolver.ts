import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiCommentService,
  Comment,
  UserCreateCommentInput,
  UserFindManyCommentInput,
  UserUpdateCommentInput,
} from '@deanslist-platform/api-comment-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiCommentUserResolver {
  constructor(private readonly service: ApiCommentService) {}

  @Mutation(() => Comment, { nullable: true })
  userCreateComment(@CtxUserId() userId: string, @Args('input') input: UserCreateCommentInput) {
    return this.service.user.createComment(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteComment(@Args('commentId') commentId: string) {
    return this.service.user.deleteComment(commentId)
  }

  @Query(() => [Comment], { nullable: true })
  userFindManyComment(@Args('input') input: UserFindManyCommentInput) {
    return this.service.user.findManyComment(input)
  }

  @Mutation(() => Comment, { nullable: true })
  userUpdateComment(@Args('commentId') commentId: string, @Args('input') input: UserUpdateCommentInput) {
    return this.service.user.updateComment(commentId, input)
  }
}
