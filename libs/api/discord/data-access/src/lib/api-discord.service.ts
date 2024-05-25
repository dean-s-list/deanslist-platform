import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { ApiDiscordBotService } from './api-discord-bot.service'
import { ApiDiscordChannelService } from './api-discord-channel.service'
import { AdminUpdateDiscordServerInput } from './dto/admin-update-discord-server.input'

@Injectable()
export class ApiDiscordService {
  private readonly logger = new Logger(ApiDiscordService.name)
  constructor(
    private readonly core: ApiCoreService,
    private readonly bot: ApiDiscordBotService,
    readonly channel: ApiDiscordChannelService,
  ) {}

  getDiscordBot() {
    return this.bot.getBot()
  }

  getDiscordRoles(serverId: string) {
    return this.bot.getRoles(serverId)
  }

  getDiscordChannels(serverId: string) {
    return this.bot.getChannels(serverId)
  }

  async getDiscordServers() {
    const [bot, db] = await Promise.all([
      this.bot.getServers(),
      this.core.data.discordServer.findMany({
        select: { id: true, createChannels: true, logChannelId: true, projectCategoryId: true, teamCategoryId: true },
      }),
    ])
    return bot.map((server) => {
      const found = db.find((s) => s.id === server.id)
      return {
        ...server,
        createChannels: found?.createChannels,
        logChannelId: found?.logChannelId,
        projectCategoryId: found?.projectCategoryId,
        teamCategoryId: found?.teamCategoryId,
      }
    })
  }

  leaveDiscordServer(serverId: string) {
    return this.bot.leaveServer(serverId)
  }

  async pingDiscordChannel({ channelId, serverId, userId }: { channelId: string; serverId: string; userId: string }) {
    const discordUser = await this.core.findDiscordIdentity({ ownerId: userId })
    if (!discordUser) {
      throw new Error('Discord user not found')
    }
    const pong = await this.bot.pingChannel({ discordUserId: discordUser.providerId, serverId, channelId })

    return !!pong
  }

  async updateDiscordServer(serverId: string, input: AdminUpdateDiscordServerInput) {
    const found = await this.core.data.discordServer.findUnique({ where: { id: serverId } })
    if (!found) {
      throw new Error(`Server ${serverId} not found`)
    }
    const updated = await this.core.data.discordServer.update({
      where: { id: serverId },
      data: input,
    })
    return !!updated
  }
}
