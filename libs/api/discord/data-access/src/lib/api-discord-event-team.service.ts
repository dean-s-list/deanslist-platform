import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { TeamCreatedEvent, TeamDeletedEvent } from '@deanslist-platform/api-team-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { MessageCreateOptions } from 'discord.js'
import { ApiDiscordBotService } from './api-discord-bot.service'

@Injectable()
export class ApiDiscordEventTeamService {
  private readonly logger = new Logger(ApiDiscordEventTeamService.name)
  constructor(private readonly bot: ApiDiscordBotService, private readonly core: ApiCoreService) {}

  @OnEvent(TeamCreatedEvent.event, { async: true })
  async handleTeamCreatedEvent(payload: TeamCreatedEvent) {
    this.logger.debug(`Received ${TeamCreatedEvent.event} event [${payload.team.id}] ${payload.team.name}`)
    const servers = await this.findTeamChannelServers()
    if (!servers.length) {
      return
    }

    this.logger.debug(`Sending message to servers ${servers.map((s) => s.id).join(', ')}`)

    const { team, teamUrl, author, discordUserId } = await this.extractPayload(payload)

    const message: MessageCreateOptions = {
      embeds: [
        {
          author,
          title: `New team created`,
          thumbnail: team.avatarUrl ? { url: team.avatarUrl } : undefined,
          url: `${teamUrl}`,
          fields: [
            { name: 'Team', value: `[${team.name}](${author.url})` },
            { name: 'Team', value: `[${team.name}](${teamUrl})` },
            { name: 'Created by', value: `<@${discordUserId}>` },
          ],
        },
      ],
    }

    const channelName = team.id

    // Create the team channels in the servers that have the team category
    for (const server of servers) {
      const serverId = server.id
      const guild = await this.bot.getServer(serverId)
      // Ensure the bot has access to the server
      if (!guild) {
        this.logger.debug(`Bot does not have access to server ${serverId}`)
        continue
      }
      // Ensure the bot can create channels
      if (!guild.permissions?.includes('ManageChannels')) {
        this.logger.debug(`Bot does not have permission to create channels in server ${serverId}`)
        continue
      }

      // Log the message to the log channel
      if (server.logChannelId) {
        await this.bot.sendMessage(server.logChannelId, message)
      }

      // Create the team channel
      const categoryId = server.teamCategoryId
      if (!categoryId) {
        this.logger.debug(`Server ${serverId} has no team category`)
        continue
      }

      const channels = this.bot.getChannels(serverId) ?? []

      // Ensure the category exists
      const category = channels.find((c) => c.id === categoryId)

      if (!category) {
        this.logger.debug(`Category ${categoryId} not found in server ${serverId}`)
        continue
      }

      // Ensure the channel doesn't exist in the category
      const existing = channels.find((c) => c.name === channelName && c.parentId === categoryId)
      if (existing) {
        this.logger.debug(`Channel ${channelName} already exists in category ${categoryId}`)
        continue
      }

      // Create the channel
      const channel = await this.bot.createTextChannel({
        serverId,
        parentId: categoryId,
        name: channelName,
        topic: `${this.core.config.webUrl}/teams/${team.id}`,
      })
      if (!channel) {
        this.logger.debug(`Error creating channel ${channelName} in category ${categoryId}`)
        continue
      }
      this.logger.verbose(`Created channel ${channel.id} in category ${categoryId}`)

      const updated = await this.core.data.team.update({
        where: { id: team.id },
        data: { channels: { create: { serverId, id: channel.id } } },
      })
      if (!updated) {
        this.logger.debug(`Error updating team ${team.id} with channel ${channel.id}`)
        continue
      }
      this.logger.verbose(`Updated team ${team.id} with channel ${channel.id}`)

      // Send the message to the channel
      await this.bot.sendMessage(channel.id, message)
    }
  }

  @OnEvent(TeamDeletedEvent.event, { async: true })
  async handleTeamDeletedEvent(payload: TeamDeletedEvent) {
    this.logger.debug(
      `Received ${TeamDeletedEvent.event} event [${payload.team.id}] ${payload.team.name} in team ${payload.team.name}`,
    )
    const { channels, author, discordUserId, team } = await this.extractPayload(payload)

    for (const channel of channels) {
      await this.bot.sendMessage(channel.id, {
        embeds: [
          {
            author,
            title: `Team deleted`,
            fields: [
              { name: 'Team', value: `[${team.name}](${author.url})` },
              { name: 'Team', value: `${team.name}` },
              { name: 'Deleted by', value: `<@${discordUserId}>` },
            ],
          },
        ],
      })
    }
  }

  private async extractPayload(payload: TeamCreatedEvent | TeamDeletedEvent) {
    const identity = await this.core.findDiscordIdentity({ ownerId: payload.userId })
    const discordUserId = identity?.providerId
    const channels = payload instanceof TeamDeletedEvent ? payload.team.channels : []
    const team = payload.team
    const teamUrl = `${this.core.config.webUrl}/teams/${team.id}`
    const author = {
      name: team.name,
      icon_url: team.avatarUrl ?? undefined,
      url: teamUrl,
    }

    return {
      author,
      channels,
      discordUserId,
      team,
      teamUrl,
    }
  }

  private async findTeamChannelServers() {
    const servers = await this.core.data.discordServer.findMany({
      where: { OR: [{ logChannelId: { not: null } }, { teamCategoryId: { not: null } }] },
    })
    return servers ?? []
  }
}
