import { ApiAuthGraphQLAdminGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  AdminFindManyProjectInput,
  AdminUpdateProjectInput,
  ApiProjectService,
  Project,
  ProjectPaging,
} from '@deanslist-platform/api-project-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiProjectAdminResolver {
  constructor(private readonly service: ApiProjectService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteProject(@CtxUserId() userId: string, @Args('projectId') projectId: string) {
    return this.service.admin.deleteProject(userId, projectId)
  }

  @Query(() => ProjectPaging)
  adminFindManyProject(@Args('input') input: AdminFindManyProjectInput) {
    return this.service.admin.findManyProject(input)
  }

  @Query(() => Project, { nullable: true })
  adminFindOneProject(@Args('projectId') projectId: string) {
    return this.service.admin.findOneProject(projectId)
  }

  @Mutation(() => Project, { nullable: true })
  adminUpdateProject(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('input') input: AdminUpdateProjectInput,
  ) {
    return this.service.admin.updateProject(userId, projectId, input)
  }
}
