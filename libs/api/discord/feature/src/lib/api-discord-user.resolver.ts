import { ApiAuthGraphQLUserGuard } from '@deanslist-platform/api-auth-data-access'
import { ApiDiscordService, DiscordChannel, DiscordServer } from '@deanslist-platform/api-discord-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiDiscordUserResolver {
  constructor(private readonly service: ApiDiscordService) {}

  @Query(() => [DiscordServer])
  userGetDiscordServers() {
    return this.service.getDiscordServers()
  }

  @Query(() => [DiscordChannel])
  userGetProjectChannels(@Args('projectId') projectId: string) {
    return this.service.channel.getProjectChannels(projectId)
  }

  @Query(() => [DiscordChannel])
  userGetCommunityChannels(@Args('communityId') communityId: string) {
    return this.service.channel.getCommunityChannels(communityId)
  }
}
