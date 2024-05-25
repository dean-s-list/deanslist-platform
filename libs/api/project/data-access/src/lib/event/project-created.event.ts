import { DiscordChannel, Project, Team } from '@prisma/client'

export class ProjectCreatedEvent {
  static readonly event = 'project.created'
  userId!: string
  project!: Project & { team: Team }
}

export class ProjectDeletedEvent {
  static readonly event = 'project.deleted'
  userId!: string
  project!: Project & { team: Team; channels: DiscordChannel[] }
}
