export class CommunityManagerAddedEvent {
  static readonly event = 'community.manager-added'
  userId!: string
  communityId!: string
  managerId!: string
}
