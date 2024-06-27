import { ApiAuthGraphQLAdminGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  AdminFindManyCommunityInput,
  AdminUpdateCommunityInput,
  ApiCommunityService,
  Community,
  CommunityMember,
  CommunityPaging,
} from '@deanslist-platform/api-community-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiCommunityAdminResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminAddCommunityMember(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') memberId: string,
  ) {
    return this.service.data.addCommunityMember(userId, communityId, memberId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteCommunity(@CtxUserId() userId: string, @Args('communityId') communityId: string) {
    return this.service.data.deleteCommunity(userId, communityId)
  }

  @Query(() => [CommunityMember], { nullable: true })
  adminGetCommunityMembers(@Args('communityId') communityId: string) {
    return this.service.data.getCommunityMembers(communityId)
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
  adminRemoveCommunityMember(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') memberId: string,
  ) {
    return this.service.data.removeCommunityMember(userId, communityId, memberId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminToggleCommunityAdmin(
    @CtxUserId() userId: string,
    @Args('communityId') communityId: string,
    @Args('userId') memberId: string,
  ) {
    return this.service.data.toggleCommunityAdmin(userId, communityId, memberId)
  }
  @Mutation(() => Community, { nullable: true })
  adminUpdateCommunity(@Args('communityId') communityId: string, @Args('input') input: AdminUpdateCommunityInput) {
    return this.service.data.updateCommunity(communityId, input)
  }
}
