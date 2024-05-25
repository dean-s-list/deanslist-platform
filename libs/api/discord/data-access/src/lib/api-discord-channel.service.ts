import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { ChannelType } from 'discord.js'
import { ApiDiscordBotService } from './api-discord-bot.service'

@Injectable()
export class ApiDiscordChannelService {
  constructor(private readonly core: ApiCoreService, private readonly bot: ApiDiscordBotService) {}

  async getProjectChannels(projectId: string) {
    return this.core.data.discordChannel
      .findMany({
        where: { projects: { some: { id: projectId } } },
        select: { id: true },
      })
      .then((res) => res.map((tem) => tem.id))
      .then((ids) => this.bot.getChannelsByIds(ids))
  }

  async getTeamChannels(teamId: string) {
    return this.core.data.discordChannel
      .findMany({
        where: { teams: { some: { id: teamId } } },
        select: { id: true },
      })
      .then((res) => res.map((tem) => tem.id))
      .then((ids) => this.bot.getChannelsByIds(ids))
  }

  async createProjectChannel({
    serverId,
    channelId,
    projectId,
  }: {
    projectId: string
    serverId: string
    channelId: string
  }) {
    const channel = await this.bot.getChannel(channelId)
    if (!channel) {
      throw new Error(`Channel ${channelId} not found`)
    }
    if (!channel.isTextBased() || channel.type !== ChannelType.GuildText) {
      throw new Error('Channel is not text based')
    }
    await this.ensureChannelAvailable(channelId)
    const created = await this.core.data.discordChannel.upsert({
      where: { id: channelId },
      create: {
        id: channelId,
        server: { connect: { id: serverId } },
        projects: { connect: { id: projectId } },
      },
      update: {
        projects: { connect: { id: projectId } },
      },
    })
    return !!created
  }
  async createTeamChannel({ serverId, channelId, teamId }: { teamId: string; serverId: string; channelId: string }) {
    const channel = await this.bot.getChannel(channelId)
    if (!channel) {
      throw new Error(`Channel ${channelId} not found`)
    }
    if (!channel.isTextBased() || channel.type !== ChannelType.GuildText) {
      throw new Error('Channel is not text based')
    }
    await this.ensureChannelAvailable(channelId)
    const created = await this.core.data.discordChannel.upsert({
      where: { id: channelId },
      create: {
        id: channelId,
        server: { connect: { id: serverId } },
        teams: { connect: { id: teamId } },
      },
      update: {
        teams: { connect: { id: teamId } },
      },
    })
    return !!created
  }

  async deleteProjectChannel({ projectId, channelId }: { projectId: string; channelId: string }) {
    const deleted = await this.core.data.discordChannel.update({
      where: { id: channelId },
      data: { projects: { disconnect: { id: projectId } } },
    })
    return !!deleted
  }

  async deleteTeamChannel({ teamId, channelId }: { teamId: string; channelId: string }) {
    const deleted = await this.core.data.discordChannel.update({
      where: { id: channelId },
      data: { teams: { disconnect: { id: teamId } } },
    })
    return !!deleted
  }

  private async ensureChannelAvailable(channelId: string) {
    const existing = await this.core.data.discordChannel.findMany({
      where: {
        id: channelId,
        OR: [{ projects: { some: {} }, teams: { some: {} } }],
      },
      select: { projects: true, teams: true },
    })
    if (existing) {
      throw new Error(`Channel is already in use by a project or team`)
    }
  }
}
