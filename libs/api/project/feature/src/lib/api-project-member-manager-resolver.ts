import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiProjectService,
  ManagerUpdateProjectMemberInput,
  ProjectMember,
} from '@deanslist-platform/api-project-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiProjectMemberManagerResolver {
  constructor(private readonly service: ApiProjectService) {}

  @Mutation(() => Boolean, { nullable: true })
  managerAddProjectManager(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('managerUserId') managerUserId: string,
  ) {
    return this.service.member.addProjectManager(userId, projectId, managerUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerAddProjectReviewer(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('reviewerUserId') reviewerUserId: string,
  ) {
    return this.service.member.addProjectReviewer(userId, projectId, reviewerUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerAddProjectReferral(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('referralUserId') referralUserId: string,
  ) {
    return this.service.member.addProjectReferral(userId, projectId, referralUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerRemoveProjectManager(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('managerUserId') managerUserId: string,
  ) {
    return this.service.member.removeProjectManager(userId, projectId, managerUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerRemoveProjectReviewer(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('reviewerUserId') reviewerUserId: string,
  ) {
    return this.service.member.removeProjectReviewer(userId, projectId, reviewerUserId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerRemoveProjectReferral(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('referralUserId') referralUserId: string,
  ) {
    return this.service.member.removeProjectReferral(userId, projectId, referralUserId)
  }

  @Mutation(() => ProjectMember, { nullable: true })
  managerUpdateProjectMember(
    @CtxUserId() userId: string,
    @Args('projectMemberId') projectMemberId: string,
    @Args('input') input: ManagerUpdateProjectMemberInput,
  ) {
    return this.service.manager.updateProjectMember(userId, projectMemberId, input)
  }
}
