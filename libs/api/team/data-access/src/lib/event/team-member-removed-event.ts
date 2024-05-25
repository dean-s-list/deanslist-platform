export class TeamMemberRemovedEvent {
  static readonly event = 'team.member-removed'
  userId!: string
  teamId!: string
  memberId!: string
}
