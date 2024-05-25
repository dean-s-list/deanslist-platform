import { ApiCoreService } from '@deanslist-platform/api-core-data-access'

import { Injectable } from '@nestjs/common'
import { TeamCreatedEvent } from './event/team-created-event'
import { TeamDeletedEvent } from './event/team-deleted-event'
import { TeamMemberAddedEvent } from './event/team-member-added-event'
import { TeamMemberRemovedEvent } from './event/team-member-removed-event'

@Injectable()
export class ApiTeamEventService {
  constructor(private readonly core: ApiCoreService) {}

  emitTeamMemberAdded(event: TeamMemberAddedEvent) {
    return this.core.event.emit(TeamMemberAddedEvent.event, event)
  }

  emitTeamMemberRemoved(event: TeamMemberRemovedEvent) {
    return this.core.event.emit(TeamMemberRemovedEvent.event, event)
  }

  emitTeamCreated(event: TeamCreatedEvent) {
    return this.core.event.emit(TeamCreatedEvent.event, event)
  }

  emitTeamDeleted(event: TeamDeletedEvent) {
    return this.core.event.emit(TeamDeletedEvent.event, event)
  }
}
