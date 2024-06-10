import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { IdentityProvider, UserRole } from '@prisma/client'
import { ApiCoreConfigService } from './api-core-config.service'
import { ApiCorePrismaClient, prismaClient } from './api-core-prisma-client'
import { slugifyId } from './helpers/slugify-id'

@Injectable()
export class ApiCoreService {
  readonly data: ApiCorePrismaClient = prismaClient
  constructor(readonly config: ApiCoreConfigService, readonly event: EventEmitter2) {}

  async ensureUserRoleAdmin(userId: string) {
    const user = await this.findUserById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    if (user.role !== UserRole.Admin) {
      throw new Error('User use not an Admin')
    }
    return user
  }

  async findDiscordIdentity({ ownerId }: { ownerId: string }) {
    return this.data.identity.findFirst({
      where: { provider: IdentityProvider.Discord, ownerId },
      include: { owner: true },
    })
  }

  async findUserByIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
    return this.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }

  async findUserById(userId: string) {
    const found = await this.data.user.findUnique({ where: { id: userId } })
    if (!found) {
      throw new Error('User not found')
    }
    return found
  }

  async findAvailableUsername(username: string): Promise<string> {
    username = slugifyId(username)
    const exists = await this.data.user.findUnique({ where: { username } })
    if (!exists) {
      return username
    }
    const newUsername = `${username}-${Math.floor(Math.random() * 1000)}`
    return this.findAvailableUsername(newUsername)
  }

  uptime() {
    return process.uptime()
  }
}
