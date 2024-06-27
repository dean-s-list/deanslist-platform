import { DiscordChannel, Project, Community } from '@prisma/client'

export class ProjectCreatedEvent {
  static readonly event = 'project.created'
  userId!: string
  project!: Project & { community: Community }
}

export class ProjectDeletedEvent {
  static readonly event = 'project.deleted'
  userId!: string
  project!: Project & { community: Community; channels: DiscordChannel[] }
}
