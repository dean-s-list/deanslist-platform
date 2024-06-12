import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { Identity as PrismaIdentity, IdentityProvider } from '@prisma/client'
import { AdminCreateIdentityInput } from './dto/admin-create-identity.input'
import { AdminFindManyIdentityInput } from './dto/admin-find-many-identity.input'

@Injectable()
export class ApiAdminIdentityService {
  constructor(private readonly core: ApiCoreService) {}

  async createIdentity(input: AdminCreateIdentityInput): Promise<PrismaIdentity> {
    const found = await this.core.data.identity.findUnique({
      where: { provider_providerId: { providerId: input.providerId, provider: input.provider } },
    })
    if (found) {
      throw new Error(`Identity ${input.providerId} on ${input.provider} already exists`)
    }
    const created = await this.core.data.identity.create({
      data: {
        providerId: input.providerId,
        provider: input.provider,
        ownerId: input.ownerId,
      },
    })
    if (!created) {
      throw new Error(`Identity ${input.providerId} on ${input.provider} not created`)
    }
    return created
  }

  async deleteIdentity(identityId: string): Promise<boolean> {
    const found = await this.core.data.identity.findUnique({ where: { id: identityId } })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    if (found.provider === IdentityProvider.Discord) {
      throw new Error(`Cannot delete Discord identity`)
    }
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async findManyIdentity(input: AdminFindManyIdentityInput): Promise<PrismaIdentity[]> {
    const items = await this.core.data.identity.findMany({
      where: {
        ownerId: input.ownerId ? input.ownerId : undefined,
        provider: input.provider ? input.provider : undefined,
      },
      orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
      include: {
        challenges: { orderBy: { createdAt: 'desc' } },
        owner: !input.ownerId,
      },
    })
    return items ?? []
  }
}
