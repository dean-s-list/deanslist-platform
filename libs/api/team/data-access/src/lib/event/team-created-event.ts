import { Team } from '@prisma/client'

export class TeamCreatedEvent {
  static readonly event = 'team.created'
  userId!: string
  team!: Team
}
