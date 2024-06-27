import { ApiAuthGraphQLUserGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  ApiCommunityService,
  ManagerCreateCommunityInput,
  ManagerFindManyCommunityInput,
  ManagerUpdateCommunityInput,
  Community,
  CommunityMember,
  CommunityPaging,
} from '@deanslist-platform/api-community-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiCommunityManagerResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Boolean, { nullable: true })
  managerAddCommunityMember(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') memberId: string,
  ) {
    return this.service.manager.addCommunityMember(userId, communityId, memberId)
  }

  @Mutation(() => Community, { nullable: true })
  managerCreateCommunity(@CtxUserId() userId: string, @Args('input') input: ManagerCreateCommunityInput) {
    return this.service.manager.createCommunity(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerDeleteCommunity(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.manager.deleteCommunity(userId, communityId)
  }

  @Query(() => [CommunityMember], { nullable: true })
  managerGetCommunityMembers(@Args('communityId') communityId: string) {
    return this.service.manager.getCommunityMembers(communityId)
  }

  @Query(() => CommunityMember, { nullable: true })
  managerGetCommunityMember(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.manager.getCommunityMember(userId, communityId)
  }

  @Query(() => CommunityPaging)
  managerFindManyCommunity(@Args('input') input: ManagerFindManyCommunityInput) {
    return this.service.manager.findManyCommunity(input)
  }

  @Query(() => Community, { nullable: true })
  managerFindOneCommunity(@Args('communityId') communityId: string) {
    return this.service.manager.findOneCommunity(communityId)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerRemoveCommunityMember(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') memberId: string,
  ) {
    return this.service.manager.removeCommunityMember(userId, communityId, memberId)
  }
  @Mutation(() => Boolean, { nullable: true })
  managerToggleCommunityAdmin(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') memberId: string,
  ) {
    return this.service.manager.toggleCommunityAdmin(userId, communityId, memberId)
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
