import { Wallet } from '@solana/wallet-adapter-react'
import { UserIdentityMap } from './use-anon-user-identity-map'
import { useLeaderboardTokenHolders } from './use-leaderboard-token-holders'
import { BN } from '@coral-xyz/anchor'
import { useAuth } from '@deanslist-platform/web-auth-data-access'

export interface LeaderboardLeader {
  wallet: string
  name: string
  avatarUrl: string | undefined
  twitter: string | undefined
  votingPower: BN
  ownVotingPower: BN
  delegatedVotingPower: BN
  isYou: boolean
  rank: number
}

export function useLeaderboardRecords({
  wallet,
  identityMap,
  apiUrl,
}: {
  wallet: Wallet | null
  identityMap: UserIdentityMap
  apiUrl: string
}) {
  const { data: leaders, error: leadersError, isFetching, refetch } = useLeaderboardTokenHolders({ apiUrl })
  const { user: me } = useAuth()

  const enhancedleaders = leaders?.map((leader) => {
    const w = leader.wallet
    const firstFour = w.substring(0, 4)
    const lastFour = w.substring(w.length - 4, w.length)

    const user = identityMap[w]
    const userDetails = user
      ? {
          name: user.name || `${firstFour}...${lastFour}`,
          avatarUrl: user.avatarUrl,
          twitter:
            user.twitter && !user.twitter.startsWith('https://x.com/') ? 'https://x.com/' + user.twitter : user.twitter,
        }
      : {
          name: `${firstFour}...${lastFour}`,
        }

    return {
      ...leader,
      ...userDetails,
      isYou: me && w === wallet?.adapter.publicKey?.toBase58(),
    } as LeaderboardLeader
  })

  return {
    error: leadersError?.message,
    loading: isFetching,
    loadingMessage: 'Fetching top leaders including their delegated voting power...',
    leaders: enhancedleaders,
    refetch,
  }
}
