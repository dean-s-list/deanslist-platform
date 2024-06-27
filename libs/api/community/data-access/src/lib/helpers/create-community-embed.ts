import { Community } from '@prisma/client'
import { APIEmbed } from 'discord.js'

export function createCommunityEmbed(
  baseUrl: string,
  community: Community & { managers: unknown[]; projects: unknown[] },
): APIEmbed {
  return {
    title: community.name,
    thumbnail: community.avatarUrl ? { url: community.avatarUrl } : undefined,
    url: `${baseUrl}/communities/${community.id}`,
    fields: [
      { name: 'ID', value: community.id, inline: true },
      { name: 'Created', value: community.createdAt.toISOString(), inline: true },
      { name: 'Updated', value: community.updatedAt.toISOString(), inline: true },
      { name: 'Managers', value: community.managers.length.toString() ?? '0', inline: true },
      { name: 'Projects', value: community.projects.length.toString() ?? '0', inline: true },
    ],
  }
}
