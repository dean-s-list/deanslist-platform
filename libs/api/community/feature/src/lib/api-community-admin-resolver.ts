import { ApiAuthGraphQLAdminGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  AdminFindManyCommunityInput,
  AdminUpdateCommunityInput,
  ApiCommunityService,
  Community,
  CommunityManager,
  CommunityPaging,
} from '@deanslist-platform/api-community-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiCommunityAdminResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminAddCommunityManager(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') managerId: string,
  ) {
    return this.service.data.addCommunityManager(userId, communityId, managerId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteCommunity(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.data.deleteCommunity(userId, communityId)
  }

  @Query(() => [CommunityManager], { nullable: true })
  adminGetCommunityManagers(@Args('communityId') communityId: string) {
    return this.service.data.getCommunityManagers(communityId)
  }

  @Query(() => CommunityPaging)
  adminFindManyCommunity(@Args('input') input: AdminFindManyCommunityInput) {
    return this.service.admin.findManyCommunity(input)
  }

  @Query(() => Community, { nullable: true })
  adminFindOneCommunity(@Args('communityId') communityId: string) {
    return this.service.data.findOneCommunity(communityId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminRemoveCommunityManager(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') managerId: string,
  ) {
    return this.service.data.removeCommunityManager(userId, communityId, managerId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminToggleCommunityAdmin(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') managerId: string,
  ) {
    return this.service.data.toggleCommunityAdmin(userId, communityId, managerId)
  }
  @Mutation(() => Community, { nullable: true })
  adminUpdateCommunity(@Args('communityId') communityId: string, @Args('input') input: AdminUpdateCommunityInput) {
    return this.service.data.updateCommunity(communityId, input)
  }
}
