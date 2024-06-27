import { ApiCoreService } from '@deanslist-platform/api-core-data-access'

import { Injectable } from '@nestjs/common'
import { CommunityCreatedEvent } from './event/community-created-event'
import { CommunityDeletedEvent } from './event/community-deleted-event'
import { CommunityManagerAddedEvent } from './event/community-manager-added-event'
import { CommunityManagerRemovedEvent } from './event/community-manager-removed-event'

@Injectable()
export class ApiCommunityEventService {
  constructor(private readonly core: ApiCoreService) {}

  emitCommunityManagerAdded(event: CommunityManagerAddedEvent) {
    return this.core.event.emit(CommunityManagerAddedEvent.event, event)
  }

  emitCommunityManagerRemoved(event: CommunityManagerRemovedEvent) {
    return this.core.event.emit(CommunityManagerRemovedEvent.event, event)
  }

  emitCommunityCreated(event: CommunityCreatedEvent) {
    return this.core.event.emit(CommunityCreatedEvent.event, event)
  }

  emitCommunityDeleted(event: CommunityDeletedEvent) {
    return this.core.event.emit(CommunityDeletedEvent.event, event)
  }
}
