import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { ProjectClosedEvent } from './event/project-closed-event'
import { ProjectCreatedEvent } from './event/project-created.event'
import { ProjectDeletedEvent } from './event/project-deleted-event'
import { ProjectsProvisionedEvent } from './event/projects-provisioned-event'

@Injectable()
export class ApiProjectEventService {
  constructor(private readonly core: ApiCoreService) {}

  emitProjectClosed(event: ProjectClosedEvent) {
    return this.core.event.emit(ProjectClosedEvent.event, event)
  }

  emitProjectCreated(event: ProjectCreatedEvent) {
    return this.core.event.emit(ProjectCreatedEvent.event, event)
  }

  emitProjectDeleted(event: ProjectDeletedEvent) {
    return this.core.event.emit(ProjectDeletedEvent.event, event)
  }

  emitProjectsProvisioned() {
    return this.core.event.emit(ProjectsProvisionedEvent.event)
  }
}
