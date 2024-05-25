import { DiscordChannel, Team } from '@prisma/client'

export class TeamDeletedEvent {
  static readonly event = 'team.deleted'
  userId!: string
  team!: Team & { channels: DiscordChannel[] }
}
