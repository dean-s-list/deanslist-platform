import { ApiAuthGraphQLUserGuard } from '@deanslist-platform/api-auth-data-access'
import {
  ApiProjectService,
  Project,
  ProjectPaging,
  UserFindManyProjectInput,
} from '@deanslist-platform/api-project-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiProjectUserResolver {
  constructor(private readonly service: ApiProjectService) {}

  @Query(() => ProjectPaging)
  userFindManyProject(@Args('input') input: UserFindManyProjectInput) {
    return this.service.user.findManyProject(input)
  }

  @Query(() => Project, { nullable: true })
  userFindOneProject(@Args('projectId') projectId: string) {
    return this.service.user.findOneProject(projectId)
  }
}
