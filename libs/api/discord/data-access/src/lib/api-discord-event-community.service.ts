import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { CommunityCreatedEvent, CommunityDeletedEvent } from '@deanslist-platform/api-community-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { MessageCreateOptions } from 'discord.js'
import { ApiDiscordBotService } from './api-discord-bot.service'

@Injectable()
export class ApiDiscordEventCommunityService {
  private readonly logger = new Logger(ApiDiscordEventCommunityService.name)
  constructor(private readonly bot: ApiDiscordBotService, private readonly core: ApiCoreService) {}

  @OnEvent(CommunityCreatedEvent.event, { async: true })
  async handleCommunityCreatedEvent(payload: CommunityCreatedEvent) {
    this.logger.debug(
      `Received ${CommunityCreatedEvent.event} event [${payload.community.id}] ${payload.community.name}`,
    )
    const servers = await this.findCommunityChannelServers()
    if (!servers.length) {
      return
    }

    this.logger.debug(`Sending message to servers ${servers.map((s) => s.id).join(', ')}`)

    const { community, communityUrl, author, discordUserId } = await this.extractPayload(payload)

    const message: MessageCreateOptions = {
      embeds: [
        {
          author,
          title: `New community created`,
          thumbnail: community.avatarUrl ? { url: community.avatarUrl } : undefined,
          url: `${communityUrl}`,
          fields: [
            { name: 'Community', value: `[${community.name}](${author.url})` },
            { name: 'Community', value: `[${community.name}](${communityUrl})` },
            { name: 'Created by', value: `<@${discordUserId}>` },
          ],
        },
      ],
    }

    const channelName = community.id

    // Create the community channels in the servers that have the community category
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

      // Create the community channel
      const categoryId = server.communityCategoryId
      if (!categoryId) {
        this.logger.debug(`Server ${serverId} has no community category`)
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
        topic: `${this.core.config.webUrl}/communities/${community.id}`,
      })
      if (!channel) {
        this.logger.debug(`Error creating channel ${channelName} in category ${categoryId}`)
        continue
      }
      this.logger.verbose(`Created channel ${channel.id} in category ${categoryId}`)

      const updated = await this.core.data.community.update({
        where: { id: community.id },
        data: { channels: { create: { serverId, id: channel.id } } },
      })
      if (!updated) {
        this.logger.debug(`Error updating community ${community.id} with channel ${channel.id}`)
        continue
      }
      this.logger.verbose(`Updated community ${community.id} with channel ${channel.id}`)

      // Send the message to the channel
      await this.bot.sendMessage(channel.id, message)
    }
  }

  @OnEvent(CommunityDeletedEvent.event, { async: true })
  async handleCommunityDeletedEvent(payload: CommunityDeletedEvent) {
    this.logger.debug(
      `Received ${CommunityDeletedEvent.event} event [${payload.community.id}] ${payload.community.name} in community ${payload.community.name}`,
    )
    const { channels, author, discordUserId, community } = await this.extractPayload(payload)

    for (const channel of channels) {
      await this.bot.sendMessage(channel.id, {
        embeds: [
          {
            author,
            title: `Community deleted`,
            fields: [
              { name: 'Community', value: `[${community.name}](${author.url})` },
              { name: 'Community', value: `${community.name}` },
              { name: 'Deleted by', value: `<@${discordUserId}>` },
            ],
          },
        ],
      })
    }
  }

  private async extractPayload(payload: CommunityCreatedEvent | CommunityDeletedEvent) {
    const identity = await this.core.findDiscordIdentity({ ownerId: payload.userId })
    const discordUserId = identity?.providerId
    const channels = payload instanceof CommunityDeletedEvent ? payload.community.channels : []
    const community = payload.community
    const communityUrl = `${this.core.config.webUrl}/communities/${community.id}`
    const author = {
      name: community.name,
      icon_url: community.avatarUrl ?? undefined,
      url: communityUrl,
    }

    return {
      author,
      channels,
      discordUserId,
      community,
      communityUrl,
    }
  }

  private async findCommunityChannelServers() {
    const servers = await this.core.data.discordServer.findMany({
      where: { OR: [{ logChannelId: { not: null } }, { communityCategoryId: { not: null } }] },
    })
    return servers ?? []
  }
}
