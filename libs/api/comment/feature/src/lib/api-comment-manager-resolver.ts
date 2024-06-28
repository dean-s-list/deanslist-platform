import { ApiAuthGraphQLUserGuard } from '@deanslist-platform/api-auth-data-access'
import { ApiCommentService, Comment, ManagerFindManyCommentInput } from '@deanslist-platform/api-comment-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiCommentManagerResolver {
  constructor(private readonly service: ApiCommentService) {}

  @Query(() => [Comment], { nullable: true })
  managerFindManyComment(@Args('input') input: ManagerFindManyCommentInput) {
    return this.service.manager.findManyComment(input)
  }
}
