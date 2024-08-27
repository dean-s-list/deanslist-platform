import { Community, Project } from '@prisma/client'

export class ProjectClosedEvent {
  static readonly event = 'project.closed'
  project!: Project & { community: Community }
}
