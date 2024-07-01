import { Wallet } from '@solana/wallet-adapter-react'
import { UserIdentityMap } from './use-anon-user-identity-map'
import { LeaderboardLeader, useLeaderboardTokenHolders } from './use-leaderboard-token-holders'

export function useLeaderboardRecords({
  wallet,
  identityMap,
  apiUrl,
}: {
  wallet: Wallet
  identityMap: UserIdentityMap
  apiUrl: string
}) {
  const { data: leaders, error: leadersError, isLoading } = useLeaderboardTokenHolders({ apiUrl })

  const enhancedleaders = leaders?.map((leader) => {
    const w = leader.wallet
    const firstFour = w.substring(0, 4)
    const lastFour = w.substring(w.length - 4, w.length)

    const user = identityMap[w]
    const userDetails = user
      ? {
          name: user.username || `${firstFour}...${lastFour}`,
          avatarUrl: user.avatarUrl,
        }
      : {
          name: `${firstFour}...${lastFour}`,
        }

    return {
      ...leader,
      ...userDetails,
      isYou: w === wallet?.adapter.publicKey?.toBase58(),
    } as LeaderboardLeader
  })

  return {
    error: leadersError?.message,
    loading: isLoading,
    loadingMessage: 'Fetching top leaders including their delegated voting power...',
    leaders: enhancedleaders,
  }
}
