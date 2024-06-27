export class CommunityManagerRemovedEvent {
  static readonly event = 'community.manager-removed'
  userId!: string
  communityId!: string
  managerId!: string
}
