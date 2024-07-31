import { ApiAuthGraphQLUserGuard, CtxUser, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiProjectService,
  ManagerCreateProjectInput,
  ManagerFindManyProjectInput,
  ManagerUpdateProjectInput,
  Project,
  ProjectPaging,
  ProjectStatus,
} from '@deanslist-platform/api-project-data-access'
import { User } from '@deanslist-platform/api-user-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiProjectManagerResolver {
  constructor(private readonly service: ApiProjectService) {}

  @Mutation(() => Project, { nullable: true })
  managerCreateProject(@CtxUserId() userId: string, @Args('input') input: ManagerCreateProjectInput) {
    return this.service.manager.createProject(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerDeleteProject(@CtxUserId() userId: string, @Args('projectId') projectId: string) {
    return this.service.manager.deleteProject(userId, projectId)
  }

  @Query(() => ProjectPaging)
  managerFindManyProject(@CtxUser() user: User, @Args('input') input: ManagerFindManyProjectInput) {
    return this.service.manager.findManyProject(user, input)
  }

  @Query(() => Project, { nullable: true })
  managerFindOneProject(@CtxUser() user: User, @Args('projectId') projectId: string) {
    return this.service.manager.findOneProject(user, projectId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerSplitByRating(@CtxUserId() userId: string, @Args('projectId') projectId: string) {
    return this.service.manager.splitByRating(userId, projectId)
  }

  @Mutation(() => Project, { nullable: true })
  managerUpdateProject(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('input') input: ManagerUpdateProjectInput,
  ) {
    return this.service.manager.updateProject(userId, projectId, input)
  }

  @Mutation(() => Project, { nullable: true })
  managerUpdateProjectStatus(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args({ name: 'status', type: () => ProjectStatus }) status: ProjectStatus,
  ) {
    return this.service.manager.updateProjectStatus(userId, projectId, status)
  }
}
