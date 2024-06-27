import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiProjectService,
  ManagerCreateProjectInput,
  ManagerFindManyProjectInput,
  ManagerUpdateProjectInput,
  Project,
  ProjectPaging,
} from '@deanslist-platform/api-project-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiProjectManagementResolver {
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
  managerAddProjectMember(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('memberUserId') memberUserId: string,
  ) {
    return this.service.manager.addProjectMember(userId, projectId, memberUserId)
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
  managerFindManyProject(@CtxUserId() userId: string, @Args('input') input: ManagerFindManyProjectInput) {
    return this.service.manager.findManyProject(userId, input)
  }

  @Query(() => Project, { nullable: true })
  managerFindOneProject(@CtxUserId() userId: string, @Args('projectId') projectId: string) {
    return this.service.manager.findOneProject(userId, projectId)
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
  managerRemoveProjectMember(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('memberUserId') memberUserId: string,
  ) {
    return this.service.manager.removeProjectMember(userId, projectId, memberUserId)
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
}
