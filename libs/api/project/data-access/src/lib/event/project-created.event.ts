import { Community, Project } from '@prisma/client'

export class ProjectCreatedEvent {
  static readonly event = 'project.created'
  userId!: string
  project!: Project & { community: Community }
}
