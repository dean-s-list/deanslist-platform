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

  const year = 2024
  const month = 8 // Months are zero-based, so 8 represents September
  const day = 25
  const hours = 11
  const minutes = 59
  const seconds = 59
  const milliseconds = 0

  const deadline = new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds))

  return {
    perks,
    loading: false,
    deadline,
  }
}
