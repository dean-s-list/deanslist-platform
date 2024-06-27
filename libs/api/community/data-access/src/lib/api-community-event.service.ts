import { ApiCoreService } from '@deanslist-platform/api-core-data-access'

import { Injectable } from '@nestjs/common'
import { CommunityCreatedEvent } from './event/community-created-event'
import { CommunityDeletedEvent } from './event/community-deleted-event'
import { CommunityMemberAddedEvent } from './event/community-member-added-event'
import { CommunityMemberRemovedEvent } from './event/community-member-removed-event'

@Injectable()
export class ApiCommunityEventService {
  constructor(private readonly core: ApiCoreService) {}

  emitCommunityMemberAdded(event: CommunityMemberAddedEvent) {
    return this.core.event.emit(CommunityMemberAddedEvent.event, event)
  }

  emitCommunityMemberRemoved(event: CommunityMemberRemovedEvent) {
    return this.core.event.emit(CommunityMemberRemovedEvent.event, event)
  }

  emitCommunityCreated(event: CommunityCreatedEvent) {
    return this.core.event.emit(CommunityCreatedEvent.event, event)
  }

  emitCommunityDeleted(event: CommunityDeletedEvent) {
    return this.core.event.emit(CommunityDeletedEvent.event, event)
  }
}
