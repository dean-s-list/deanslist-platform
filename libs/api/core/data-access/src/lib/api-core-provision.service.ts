import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Prisma, UserStatus } from '@prisma/client'
import { ApiCoreService } from './api-core.service'
import { hashPassword } from './helpers/hash-validate-password'
import { slugifyId, slugifyUsername } from './helpers/slugify-id'
import { provisionDataDiscordServers } from './provision/provision-data-discord-servers'
import { provisionDataTeams } from './provision/provision-data-teams'
import { provisionDataUsers } from './provision/provision-data-users'

@Injectable()
export class ApiCoreProvisionService implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  async onModuleInit() {
    if (this.core.config.databaseReset) {
      await this.resetDatabase()
      this.logger.verbose(`Reset database`)
    }
    if (this.core.config.databaseProvision) {
      await this.provisionDatabase()
      this.logger.verbose(`Provisioned database`)
    }
  }

  private async provisionDatabase() {
    await this.provisionUsers()
    await this.provisionTeams()
    await this.provisionDiscordServers()
  }

  private async provisionUsers() {
    await Promise.all(provisionDataUsers.map((user) => this.provisionUser(user)))
  }

  private async provisionUser(input: Prisma.UserCreateInput) {
    const username = slugifyUsername(input.username)
    const existing = await this.core.data.user.count({ where: { username } })
    if (existing < 1) {
      await this.core.data.user.create({
        data: {
          ...input,
          id: username,
          password: input.password ? hashPassword(input.password) : undefined,
          status: input.status ?? UserStatus.Active,
        },
      })
      this.logger.verbose(
        `Provisioned ${input.role} ${input.username} ${input.password ? 'and password' : 'and external provider'}`,
      )
      return
    }
    this.logger.verbose(
      `Log in with ${input.role} ${input.username} ${input.password ? 'and password' : 'an external provider'}`,
    )
  }

  private async provisionTeams() {
    await Promise.all(provisionDataTeams.map((team) => this.provisionTeam(team)))
  }

  private async provisionTeam(input: Prisma.TeamCreateInput) {
    const id = input.id ?? slugifyId(input.name)
    const existing = await this.core.data.team.count({ where: { id } })
    if (existing < 1) {
      await this.core.data.team.create({
        data: {
          ...input,
          id,
        },
      })
      this.logger.verbose(`Provisioned team ${input.name}`)
      return
    }
  }

  private async provisionDiscordServers() {
    await Promise.all(provisionDataDiscordServers.map((discordServer) => this.provisionDiscordServer(discordServer)))
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

  private async resetDatabase() {
    await this.core.data.identityChallenge.deleteMany()
    await this.core.data.identity.deleteMany()
    await this.core.data.user.deleteMany()
  }
}
