import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { ProjectCreatedEvent, ProjectDeletedEvent } from '@deanslist-platform/api-project-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ApiDiscordBotService } from './api-discord-bot.service'

@Injectable()
export class ApiDiscordEventProjectService {
  private readonly logger = new Logger(ApiDiscordEventProjectService.name)
  constructor(private readonly bot: ApiDiscordBotService, private readonly core: ApiCoreService) {}

  @OnEvent(ProjectCreatedEvent.event, { async: true })
  async handleProjectCreatedEvent(payload: ProjectCreatedEvent) {
    this.logger.debug(
      `Received ${ProjectCreatedEvent.event} event [${payload.project.id}] ${payload.project.name} in team ${payload.project.team.name}`,
    )
    const servers = await this.findProjectChannelServers()
    if (!servers.length) {
      return
    }

    this.logger.debug(`Sending message to servers ${servers.map((s) => s.id).join(', ')}`)

    const { project, projectUrl, author, discordUserId, team } = await this.extractPayload(payload)

    const channelName = project.slug

    // Create the project channels in the servers that have the project category
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

      const categoryId = server.projectCategoryId
      if (!categoryId) {
        this.logger.debug(`Server ${serverId} has no project category`)
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
        topic: `${this.core.config.webUrl}/projects/${project.id}`,
      })
      if (!channel) {
        this.logger.debug(`Error creating channel ${channelName} in category ${categoryId}`)
        continue
      }
      this.logger.verbose(`Created channel ${channel.id} in category ${categoryId}`)

      const updated = await this.core.data.project.update({
        where: { id: project.id },
        data: { channels: { create: { serverId, id: channel.id } } },
      })
      if (!updated) {
        this.logger.debug(`Error updating project ${project.id} with channel ${channel.id}`)
        continue
      }
      this.logger.verbose(`Updated project ${project.id} with channel ${channel.id}`)

      // Send the message to the channel
      await this.bot.sendMessage(channel.id, {
        embeds: [
          {
            author,
            title: `New project created`,
            thumbnail: project.avatarUrl ? { url: project.avatarUrl } : undefined,
            url: `${projectUrl}`,
            fields: [
              { name: 'Team', value: `[${team.name}](${author.url})` },
              { name: 'Project', value: `[${project.name}](${projectUrl})` },
              { name: 'Created by', value: `<@${discordUserId}>` },
            ],
          },
        ],
      })
    }
  }

  @OnEvent(ProjectDeletedEvent.event, { async: true })
  async handleProjectDeletedEvent(payload: ProjectDeletedEvent) {
    this.logger.debug(
      `Received ${ProjectDeletedEvent.event} event [${payload.project.id}] ${payload.project.name} in team ${payload.project.team.name}`,
    )
    const { channels, project, author, discordUserId, team } = await this.extractPayload(payload)

    for (const channel of channels) {
      await this.bot.sendMessage(channel.id, {
        embeds: [
          {
            author,
            title: `Project deleted`,
            fields: [
              { name: 'Team', value: `[${team.name}](${author.url})` },
              { name: 'Project', value: `${project.name}` },
              { name: 'Deleted by', value: `<@${discordUserId}>` },
            ],
          },
        ],
      })
    }
  }

  private async extractPayload(payload: ProjectCreatedEvent | ProjectDeletedEvent) {
    const identity = await this.core.findDiscordIdentity({ ownerId: payload.userId })
    const discordUserId = identity?.providerId
    const channels = payload instanceof ProjectDeletedEvent ? payload.project.channels : []
    const project = payload.project
    const team = project.team
    const author = {
      name: team.name,
      icon_url: team.avatarUrl ?? undefined,
      url: `${this.core.config.webUrl}/teams/${team.id}`,
    }
    const projectUrl = `${this.core.config.webUrl}/projects/${project.id}`

    return {
      author,
      channels,
      discordUserId,
      project,
      projectUrl,
      team,
    }
  }

  private async findProjectChannelServers() {
    const servers = await this.core.data.discordServer.findMany({
      where: { createChannels: true, projectCategoryId: { not: null } },
    })
    return servers ?? []
  }
}
