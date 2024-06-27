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
  adminAddProjectManager(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('managerUserId') managerUserId: string,
  ) {
    return this.service.admin.addProjectManager(userId, projectId, managerUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminAddProjectMember(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('memberUserId') memberUserId: string,
  ) {
    return this.service.admin.addProjectMember(userId, projectId, memberUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminAddProjectReferral(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('referralUserId') referralUserId: string,
  ) {
    return this.service.admin.addProjectReferral(userId, projectId, referralUserId)
  }

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

  @Mutation(() => Boolean, { nullable: true })
  adminRemoveProjectManager(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('managerUserId') managerUserId: string,
  ) {
    return this.service.admin.removeProjectManager(userId, projectId, managerUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminRemoveProjectMember(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('memberUserId') memberUserId: string,
  ) {
    return this.service.admin.removeProjectMember(userId, projectId, memberUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminRemoveProjectReferral(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('referralUserId') referralUserId: string,
  ) {
    return this.service.admin.removeProjectReferral(userId, projectId, referralUserId)
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
