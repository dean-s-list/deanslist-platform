import { ApiAuthGraphQLAdminGuard } from '@deanslist-platform/api-auth-data-access'
import {
  AdminFindManyCommentInput,
  AdminUpdateCommentInput,
  ApiCommentService,
  Comment,
} from '@deanslist-platform/api-comment-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiCommentAdminResolver {
  constructor(private readonly service: ApiCommentService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteComment(@Args('commentId') commentId: string) {
    return this.service.admin.deleteComment(commentId)
  }

  @Query(() => [Comment], { nullable: true })
  adminFindManyComment(@Args('input') input: AdminFindManyCommentInput) {
    return this.service.admin.findManyComment(input)
  }

  @Mutation(() => Comment, { nullable: true })
  adminUpdateComment(@Args('commentId') commentId: string, @Args('input') input: AdminUpdateCommentInput) {
    return this.service.admin.updateComment(commentId, input)
  }
}
