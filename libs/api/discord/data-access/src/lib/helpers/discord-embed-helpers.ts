import { IdentityProviderCacheItem } from '@deanslist-platform/api-core-data-access'
import { Identity, IdentityProvider, Project, User } from '@prisma/client'
import { APIEmbed, APIEmbedField } from 'discord.js'

export function getIdentityLink(identity: Identity) {
  switch (identity.provider) {
    case IdentityProvider.Discord:
      return `<@${identity.providerId}>`
    case IdentityProvider.Solana:
      return `[${identity.providerId}](https://solana.fm/address/${identity.providerId})`
    default:
      return identity.providerId
  }
}

export function onboardUserEmbeds(baseUrl: string, userId: string): APIEmbed[] {
  return [
    {
      title: 'Welcome!',
      description: 'Please sign up to get started.',
      url: `${baseUrl}/login`,
      fields: [
        { name: 'Discord User', value: `<@${userId}>` },
        { name: 'Create an Account', value: `${baseUrl}/login` },
      ],
    },
  ]
}
export function createIdentityEmbed(item: IdentityProviderCacheItem): APIEmbed {
  return { title: 'Identities', fields: createIdentityFields(item.owner.identities) }
}
function createIdentityFields(identities: Identity[]): APIEmbedField[] {
  const sorted = identities.sort((a, b) => a.provider.localeCompare(b.provider))

  const grouped = sorted.reduce((acc, identity) => {
    if (!acc[identity.provider]) {
      acc[identity.provider] = []
    }
    acc[identity.provider].push(identity)
    return acc
  }, {} as Record<string, Identity[]>)

  return Object.entries(grouped).map(([provider, identities]) => {
    return {
      name: provider,
      value: identities.map((identity) => getIdentityLink(identity)).join('\n'),
    }
  }, [])
}

export function createUserEmbed(item: IdentityProviderCacheItem): APIEmbed {
  return {
    title: 'User Information',
    author: { name: item.owner.username, icon_url: item.owner.avatarUrl ?? undefined },
    fields: createUserFields(item.owner),
  }
}

function createUserFields(user: User): APIEmbedField[] {
  return [
    { name: 'ID', value: user.id },
    { name: 'Username', value: user.username },
    { name: 'Created', value: user.createdAt.toISOString() },
    { name: 'Updated', value: user.updatedAt.toISOString() },
  ]
}

export function createProjectEmbed(baseUrl: string, item: Project): APIEmbed {
  return {
    title: 'Project Information',
    author: { name: item.name, icon_url: item.avatarUrl ?? undefined },
    url: `${baseUrl}/communities/${item.id}`,
    fields: createProjectFields(item),
  }
}

function createProjectFields(item: Project): APIEmbedField[] {
  return [
    { name: 'ID', value: item.id },
    { name: 'Created', value: item.createdAt.toISOString() },
    { name: 'Updated', value: item.updatedAt.toISOString() },
    { name: 'Start Date', value: item.startDate?.toISOString() ?? 'N/A' },
    { name: 'Duration', value: `${item.duration} weeks` },
  ]
}
