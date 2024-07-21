import { COMMUNITIES_PROVISIONED } from '@deanslist-platform/api-community-data-access'
import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Prisma } from '@prisma/client'
import { provisionDiscordServers } from './api-discord-server-provision-data'

@Injectable()
export class ApiDiscordServerProvisionService {
  private readonly logger = new Logger(ApiDiscordServerProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent(COMMUNITIES_PROVISIONED)
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await Promise.all(provisionDiscordServers.map((discordServer) => this.provisionDiscordServer(discordServer)))
      this.logger.verbose(`Provisioned discord-servers`)
    }
  }

  private async provisionDiscordServer(input: Prisma.DiscordServerCreateInput) {
    const id = input.id
    const existing = await this.core.data.discordServer.count({ where: { id } })
    if (existing < 1) {
      await this.core.data.discordServer.create({ data: { ...input, id } })
      this.logger.verbose(`Provisioned Discord Server ${input.id}`)
      return
    }
  }
}
