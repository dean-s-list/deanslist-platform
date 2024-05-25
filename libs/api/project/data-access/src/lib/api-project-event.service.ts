import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { ProjectCreatedEvent, ProjectDeletedEvent } from './event/project-created.event'

@Injectable()
export class ApiProjectEventService {
  constructor(private readonly core: ApiCoreService) {}

  emitProjectCreated(event: ProjectCreatedEvent) {
    return this.core.event.emit(ProjectCreatedEvent.event, event)
  }

  emitProjectDeleted(event: ProjectDeletedEvent) {
    return this.core.event.emit(ProjectDeletedEvent.event, event)
  }
}
