import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiProjectService,
  Project,
  ProjectPaging,
  ReviewerFindManyProjectInput,
} from '@deanslist-platform/api-project-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiProjectReviewerResolver {
  constructor(private readonly service: ApiProjectService) {}

  @Query(() => ProjectPaging)
  reviewerFindManyProject(@CtxUserId() userId: string, @Args('input') input: ReviewerFindManyProjectInput) {
    return this.service.reviewer.findManyProject(userId, input)
  }

  @Query(() => Project, { nullable: true })
  reviewerFindOneProject(@Args('projectId') projectId: string) {
    return this.service.reviewer.findOneProject(projectId)
  }
}
