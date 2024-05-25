import { Identity, IdentityProvider, User } from '@prisma/client'
import { LRUCache } from 'lru-cache'
import { ApiCorePrismaClient } from '../api-core-prisma-client'

export type IdentityProviderCacheItem = {
  provider: IdentityProvider
  providerId: string
  owner: User & { identities: Identity[] }
}

export function createIdentityProviderCache({
  data,
  provider,
  max,
}: {
  data: ApiCorePrismaClient
  provider: IdentityProvider
  max: number
}) {
  return new LRUCache<string, IdentityProviderCacheItem>({
    max,
    fetchMethod: async (providerId: string) => {
      const found = await data.identity.findUnique({
        where: { provider_providerId: { provider, providerId } },
        include: { owner: { include: { identities: true } } },
      })
      return found ?? undefined
    },
  })
}
