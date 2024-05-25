import { ApiAuthGraphQLAdminGuard, CtxUserId } from '@deanslist-platform/api-auth-data-access'
import {
  AdminUpdateDiscordServerInput,
  ApiDiscordService,
  DiscordBot,
  DiscordChannel,
  DiscordRole,
  DiscordServer,
} from '@deanslist-platform/api-discord-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiDiscordAdminResolver {
  constructor(private readonly service: ApiDiscordService) {}

  @Query(() => DiscordBot)
  adminGetDiscordBot() {
    return this.service.getDiscordBot()
  }
  @Query(() => [DiscordServer])
  adminGetDiscordServers() {
    return this.service.getDiscordServers()
  }
  @Query(() => [DiscordChannel])
  adminGetDiscordChannels(@Args('serverId') serverId: string) {
    return this.service.getDiscordChannels(serverId)
  }
  @Query(() => [DiscordChannel])
  adminGetProjectChannels(@Args('projectId') projectId: string) {
    return this.service.channel.getProjectChannels(projectId)
  }

  @Query(() => [DiscordChannel])
  adminGetTeamChannels(@Args('teamId') teamId: string) {
    return this.service.channel.getTeamChannels(teamId)
  }

  @Query(() => [DiscordRole])
  adminGetDiscordRoles(@Args('serverId') serverId: string) {
    return this.service.getDiscordRoles(serverId)
  }

  @Mutation(() => Boolean)
  adminLeaveDiscordServer(@CtxUserId() userId: string, @Args('serverId') serverId: string) {
    return this.service.leaveDiscordServer(serverId)
  }

  @Mutation(() => Boolean)
  adminPingDiscordChannel(
    @CtxUserId() userId: string,
    @Args('serverId') serverId: string,
    @Args('channelId') channelId: string,
  ) {
    return this.service.pingDiscordChannel({ channelId, serverId, userId })
  }

  @Mutation(() => Boolean)
  adminUpdateDiscordServer(@Args('serverId') serverId: string, @Args('input') input: AdminUpdateDiscordServerInput) {
    return this.service.updateDiscordServer(serverId, input)
  }

  @Mutation(() => Boolean)
  adminCreateProjectChannel(
    @Args('projectId') projectId: string,
    @Args('serverId') serverId: string,
    @Args('channelId') channelId: string,
  ) {
    return this.service.channel.createProjectChannel({ projectId, channelId, serverId })
  }

  @Mutation(() => Boolean)
  adminDeleteProjectChannel(@Args('projectId') projectId: string, @Args('channelId') channelId: string) {
    return this.service.channel.deleteProjectChannel({ projectId, channelId })
  }

  @Mutation(() => Boolean)
  adminCreateTeamChannel(
    @Args('teamId') teamId: string,
    @Args('serverId') serverId: string,
    @Args('channelId') channelId: string,
  ) {
    return this.service.channel.createTeamChannel({ teamId, channelId, serverId })
  }

  @Mutation(() => Boolean)
  adminDeleteTeamChannel(@Args('teamId') teamId: string, @Args('channelId') channelId: string) {
    return this.service.channel.deleteTeamChannel({ teamId, channelId })
  }
}
