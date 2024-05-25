export class TeamMemberAddedEvent {
  static readonly event = 'team.member-added'
  userId!: string
  teamId!: string
  memberId!: string
}
