import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiProjectService,
  Project,
  ProjectPaging,
  UserCreateProjectInput,
  UserFindManyProjectInput,
  UserUpdateProjectInput,
} from '@deanslist-platform/api-project-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiProjectUserResolver {
  constructor(private readonly service: ApiProjectService) {}

  @Mutation(() => Project, { nullable: true })
  userCreateProject(@CtxUserId() userId: string, @Args('input') input: UserCreateProjectInput) {
    return this.service.user.createProject(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteProject(@CtxUserId() userId: string, @Args('projectId') projectId: string) {
    return this.service.user.deleteProject(userId, projectId)
  }

  @Query(() => ProjectPaging)
  userFindManyProject(@Args('input') input: UserFindManyProjectInput) {
    return this.service.user.findManyProject(input)
  }

  @Query(() => Project, { nullable: true })
  userFindOneProject(@Args('projectId') projectId: string) {
    return this.service.user.findOneProject(projectId)
  }

  @Mutation(() => Project, { nullable: true })
  userUpdateProject(
    @CtxUserId() userId: string,
    @Args('projectId') projectId: string,
    @Args('input') input: UserUpdateProjectInput,
  ) {
    return this.service.user.updateProject(userId, projectId, input)
  }
}
