export interface LeaderboardPerk {
  top: number
  perk: string
  color: string
  icon: string
}

export function useLeaderboardPerks() {
  const perks = [
    {
      top: 5,
      perk: 'Free trip to ThailanDAO',
      color: 'brand',
      icon: '🛫',
    },
    {
      top: 50,
      perk: 'VIP Event and Parties',
      color: 'cyan',
      icon: '🎉️',
    },
  ]

  const deadline = new Date(1721213447000)

  return {
    perks,
    loading: false,
    deadline,
  }
}
