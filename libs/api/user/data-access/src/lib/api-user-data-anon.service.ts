import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiUserDataService } from './api-user-data.service'

@Injectable()
export class ApiUserDataAnonService {
  constructor(private readonly core: ApiCoreService, private readonly data: ApiUserDataService) {}

  async anonGetUserMap() {
    const identities = await this.core.data.identity.findMany({
      where: { provider: IdentityProvider.Solana },
      select: { providerId: true, owner: { select: { username: true, avatarUrl: true } } },
    })

    return identities.reduce((acc, identity) => {
      acc[identity.providerId] = identity.owner as { username: string; avatarUrl: string }
      return acc
    }, {} as Record<string, { username: string; avatarUrl: string }>)
  }
}
