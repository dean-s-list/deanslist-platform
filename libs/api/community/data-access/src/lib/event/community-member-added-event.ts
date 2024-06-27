export class CommunityMemberAddedEvent {
  static readonly event = 'community.member-added'
  userId!: string
  communityId!: string
  memberId!: string
}
