import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiCommunityService,
  Community,
  CommunityManager,
  CommunityPaging,
  ManagerCreateCommunityInput,
  ManagerFindManyCommunityInput,
  ManagerUpdateCommunityInput,
} from '@deanslist-platform/api-community-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiCommunityManagerResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Boolean, { nullable: true })
  managerAddCommunityManager(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') managerId: string,
  ) {
    return this.service.manager.addCommunityManager(userId, communityId, managerId)
  }

  @Mutation(() => Community, { nullable: true })
  managerCreateCommunity(@CtxUserId() userId: string, @Args('input') input: ManagerCreateCommunityInput) {
    return this.service.manager.createCommunity(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerDeleteCommunity(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.manager.deleteCommunity(userId, communityId)
  }

  @Query(() => [CommunityManager], { nullable: true })
  managerGetCommunityManagers(@Args('communityId') communityId: string) {
    return this.service.manager.getCommunityManagers(communityId)
  }

  @Query(() => CommunityManager, { nullable: true })
  managerGetCommunityManager(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.manager.getCommunityManager(userId, communityId)
  }

  @Query(() => CommunityPaging)
  managerFindManyCommunity(@CtxUserId() userId: string, @Args('input') input: ManagerFindManyCommunityInput) {
    return this.service.manager.findManyCommunity(userId, input)
  }

  @Query(() => Community, { nullable: true })
  managerFindOneCommunity(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.manager.findOneCommunity(userId, communityId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerRemoveCommunityManager(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') managerId: string,
  ) {
    return this.service.manager.removeCommunityManager(userId, communityId, managerId)
  }
  @Mutation(() => Boolean, { nullable: true })
  managerToggleCommunityAdmin(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') managerId: string,
  ) {
    return this.service.manager.toggleCommunityAdmin(userId, communityId, managerId)
  }

  @Mutation(() => Community, { nullable: true })
  managerUpdateCommunity(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('input') input: ManagerUpdateCommunityInput,
  ) {
    return this.service.manager.updateCommunity(userId, communityId, input)
  }
}
