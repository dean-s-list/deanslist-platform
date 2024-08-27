import { Community, DiscordChannel, Project } from '@prisma/client'

export class ProjectDeletedEvent {
  static readonly event = 'project.deleted'
  userId!: string
  project!: Project & { community: Community; channels: DiscordChannel[] }
}
