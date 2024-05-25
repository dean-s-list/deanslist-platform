import { ApiAuthGraphQLAdminGuard } from '@deanslist-platform/api-auth-data-access'
import { ApiDiscordService, DiscordChannel, DiscordServer } from '@deanslist-platform/api-discord-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
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
  userGetTeamChannels(@Args('teamId') teamId: string) {
    return this.service.channel.getTeamChannels(teamId)
  }
}
