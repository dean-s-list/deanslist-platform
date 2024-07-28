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

  @Mutation(() => Boolean, { nullable: true })
  managerAddProjectManager(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('managerUserId') managerUserId: string,
  ) {
    return this.service.manager.addProjectManager(userId, projectId, managerUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerAddProjectReviewer(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('reviewerUserId') reviewerUserId: string,
  ) {
    return this.service.manager.addProjectReviewer(userId, projectId, reviewerUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerAddProjectReferral(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('referralUserId') referralUserId: string,
  ) {
    return this.service.manager.addProjectReferral(userId, projectId, referralUserId)
  }

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
  managerRemoveProjectManager(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('managerUserId') managerUserId: string,
  ) {
    return this.service.manager.removeProjectManager(userId, projectId, managerUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerRemoveProjectReviewer(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('reviewerUserId') reviewerUserId: string,
  ) {
    return this.service.manager.removeProjectReviewer(userId, projectId, reviewerUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerRemoveProjectReferral(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('referralUserId') referralUserId: string,
  ) {
    return this.service.manager.removeProjectReferral(userId, projectId, referralUserId)
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
