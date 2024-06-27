import { ApiAuthGraphQLUserGuard } from '@deanslist-platform/api-auth-data-access'
import {
  ApiCommunityService,
  Community,
  CommunityPaging,
  UserFindManyCommunityInput,
} from '@deanslist-platform/api-community-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiCommunityUserResolver {
  constructor(private readonly service: ApiCommunityService) {}

  @Query(() => CommunityPaging)
  userFindManyCommunity(@Args('input') input: UserFindManyCommunityInput) {
    return this.service.user.findManyCommunity(input)
  }

  @Query(() => Community, { nullable: true })
  userFindOneCommunity(@Args('communityId') communityId: string) {
    return this.service.user.findOneCommunity(communityId)
  }
}
