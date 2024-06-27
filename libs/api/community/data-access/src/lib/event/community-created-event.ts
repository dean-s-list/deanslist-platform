import { Community } from '@prisma/client'

export class CommunityCreatedEvent {
  static readonly event = 'community.created'
  userId!: string
  community!: Community
}
