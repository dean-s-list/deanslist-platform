import { useEffect, useState } from 'react'
import { pipe } from 'fp-ts/function'
import { fromTaskOption, matchW } from 'fp-ts/TaskEither'
import { ProgramAccount, TokenOwnerRecord } from '@solana/spl-governance'

import { BN } from '@coral-xyz/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useUserFindManyUser } from '@deanslist-platform/web-user-data-access'
import { getTokenOwnerRecords } from '@realms/models/proposal'
import { useRealmsConnection } from '@realms/connection'
import { useVsrClient } from '@realms/VoterWeightPlugins/useVsrClient'
import { useRealmQuery } from '@realms/hooks/queries/realm'
import { getLockTokensVotingPowerPerWallet } from '@realms/VoteStakeRegistry/tools/deposits'
import { getDelegatedVotingPower } from './use-leaderboard-delegated-votes'

const governingTokenMint = new PublicKey('Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a')
const programId = new PublicKey('GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw')
const realmPK = new PublicKey('F9V4Lwo49aUe8fFujMbU6uhdFyDRqKY54WpzdpncUSk9')

export interface LeaderboardLeader {
  wallet: string
  name: string
  avatarUrl: string | undefined
  profileUrl: string | undefined
  votingPower: BN
  isYou: boolean
  rank: number
}

export function useLeaderboardRecords() {
  const { wallet } = useWallet()
  const { vsrClient } = useVsrClient()
  const { connection } = useRealmsConnection()
  const realm = useRealmQuery().data?.result

  const { items: users } = useUserFindManyUser({ limit: 100000 })
  const [tokenOwnerRecords, setTokenOwnerRecords] = useState<ProgramAccount<TokenOwnerRecord>[] | null>(null)
  const [votePowerRecords, setVotePowerRecords] = useState<Record<string, BN> | null>(null)
  const [delegatedPowers, setDelegatedPowers] = useState<Record<string, BN> | null>(null)
  const [error, setError] = useState<string>('')
  const [loadingMessage, setLoadingMessage] = useState<string>('Fetching all token holders...')
  const walletsPks = tokenOwnerRecords?.map((t) => t.account.governingTokenOwner) || []

  useEffect(() => {
    if (connection) {
      // getTokenOwnerRecords({
      //   governingTokenMint,
      //   connection,
      //   programId,
      //   realm: realmPK,
      // }).then((s: any) => setTokenOwnerRecords(s ? s?.value : undefined))
      pipe(
        () =>
          getTokenOwnerRecords({
            governingTokenMint,
            connection,
            programId,
            realm: realmPK,
          }),
        fromTaskOption(() => new Error('Could not fetch token records.')),
        matchW((reason) => {
          console.log(reason)
          setError('Could not fetch token records.')
        }, setTokenOwnerRecords),
      )()
    }
  }, [connection])

  useEffect(() => {
    if (realm && connection && vsrClient && tokenOwnerRecords && tokenOwnerRecords.length) {
      setLoadingMessage("Fetching token holders' voting power...")
      getLockTokensVotingPowerPerWallet(walletsPks, realm, vsrClient, connection)
        .then(setVotePowerRecords)
        .catch(() => setError('Could not fetch voting powers.'))
    }
  }, [tokenOwnerRecords?.length, tokenOwnerRecords, vsrClient, connection, realm])

  const leaders = tokenOwnerRecords
    ?.map((t) => {
      const w = t.account.governingTokenOwner.toBase58()
      const delegatedPower = delegatedPowers && delegatedPowers[w] ? delegatedPowers[w] : new BN(0)
      const votingPower = votePowerRecords && votePowerRecords[w] ? votePowerRecords[w] : new BN(0)
      const firstFour = w.substring(0, 4)
      const lastFour = w.substring(w.length - 4, w.length)
      const user = users.find((u) => u.username?.startsWith(firstFour + lastFour))

      return {
        wallet: w,
        name: user?.name || `${firstFour}...${lastFour}`,
        avatarUrl: user?.avatarUrl,
        profileUrl: user?.profileUrl,
        ownVotingPower: votingPower,
        delegatedVotingPower: delegatedPower,
        votingPower: votingPower.add(delegatedPower),
        isYou: w === wallet?.adapter.publicKey?.toBase58(),
        rank: 0,
      } as LeaderboardLeader
    })
    .filter((l) => !l.votingPower.isZero())
    .sort((a, b) => b.votingPower.toNumber() - a.votingPower.toNumber())
    .map((l, i) => ({ ...l, rank: i + 1 }))

  useEffect(() => {
    if (realm && connection && vsrClient && leaders && leaders.length) {
      setLoadingMessage("Fetching token holders' delegated voting power...")
      const wals = leaders.map((l) => new PublicKey(l.wallet))
      // const wals = [new PublicKey('Fywb7YDCXxtD7pNKThJ36CAtVe23dEeEPf7HqKzJs1VG')]
      getDelegatedVotingPower(wals, realm, vsrClient, connection)
        .then(setDelegatedPowers)
        .catch(() => setError('Could not fetch delegated voting powers.'))
    }
  }, [leaders?.length, realm, connection, vsrClient, connection])

  return {
    error,
    loading: !tokenOwnerRecords || !votePowerRecords || !delegatedPowers,
    loadingMessage,
    leaders,
    tokenOwnerRecords,
  }
}

// no delegeators = 20 calls
// only get delegators = 22 calls for 1
// only get delegators = 196 calls for 88
