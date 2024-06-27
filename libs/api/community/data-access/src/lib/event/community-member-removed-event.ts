export class CommunityMemberRemovedEvent {
  static readonly event = 'community.member-removed'
  userId!: string
  communityId!: string
  memberId!: string
}
