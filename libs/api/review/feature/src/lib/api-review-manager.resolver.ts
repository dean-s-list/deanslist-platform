import { ApiAuthGraphQLUserGuard } from '@deanslist-platform/api-auth-data-access'
import {
  ApiReviewService,
  ManagerFindManyReviewByProjectInput,
  Review,
} from '@deanslist-platform/api-review-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiReviewManagerResolver {
  constructor(private readonly service: ApiReviewService) {}

  @Query(() => [Review], { nullable: true })
  managerFindManyReviewByProject(@Args('input') input: ManagerFindManyReviewByProjectInput) {
    return this.service.manager.findManyReviewByProject(input)
  }
}
