import { DiscordChannel, Community } from '@prisma/client'

export class CommunityDeletedEvent {
  static readonly event = 'community.deleted'
  userId!: string
  community!: Community & { channels: DiscordChannel[] }
}
