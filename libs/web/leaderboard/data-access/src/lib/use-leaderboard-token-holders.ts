import { useQuery } from '@tanstack/react-query'
import { BN } from '@coral-xyz/anchor'
import { toastError, toastSuccess } from '@pubkey-ui/core'

export interface LeaderboardLeaderResponse {
  wallet: string
  votingPower: string
  ownVotingPower: string
  delegatedVotingPower: string
  rank: number
}

export function useLeaderboardTokenHolders({ apiUrl = '' }: { apiUrl?: string } = {}) {
  return useQuery({
    queryKey: ['leaderboard', 'get-token-holders'],
    queryFn: () =>
      fetch(`${apiUrl}/api/leaderboard/token-holders`).then((res) => {
        if (res.status === 200) {
          return (res.json() as Promise<LeaderboardLeaderResponse[]>).then((leaders) => {
            return leaders.map((leader) => ({
              ...leader,
              ownVotingPower: new BN(leader.ownVotingPower, 16),
              delegatedVotingPower: new BN(leader.delegatedVotingPower, 16),
              votingPower: new BN(leader.votingPower, 16),
            }))
          })
        }
        throw new Error("Unable to fetch Dean's token holders.")
      }),
    staleTime: 3600000, // 1 hour
  })
}

export async function clearLeaderboardCache({ apiUrl = '' }: { apiUrl?: string } = {}) {
  const res = await fetch(`${apiUrl}/api/leaderboard/clear-cache`)

  if (res.status === 200) {
    toastSuccess('Cache cleared')
    return
  }

  toastError('Unable to clear leaderboard cache.')
}
