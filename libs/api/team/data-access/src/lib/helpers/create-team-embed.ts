import { Team } from '@prisma/client'
import { APIEmbed } from 'discord.js'

export function createTeamEmbed(baseUrl: string, team: Team & { members: unknown[]; projects: unknown[] }): APIEmbed {
  return {
    title: team.name,
    thumbnail: team.avatarUrl ? { url: team.avatarUrl } : undefined,
    url: `${baseUrl}/teams/${team.id}`,
    fields: [
      { name: 'ID', value: team.id, inline: true },
      { name: 'Created', value: team.createdAt.toISOString(), inline: true },
      { name: 'Updated', value: team.updatedAt.toISOString(), inline: true },
      { name: 'Members', value: team.members.length.toString() ?? '0', inline: true },
      { name: 'Projects', value: team.projects.length.toString() ?? '0', inline: true },
    ],
  }
}
