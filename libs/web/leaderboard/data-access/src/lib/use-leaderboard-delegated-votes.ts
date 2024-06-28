import { BlockhashWithExpiryBlockHeight, Connection, PublicKey } from '@solana/web3.js'
import { VsrClient } from '@realms/VoteStakeRegistry/sdk/client'
import {
  booleanFilter,
  getGovernanceAccounts,
  ProgramAccount,
  pubkeyFilter,
  TokenOwnerRecord,
} from '@solana/spl-governance'
import { getLockTokensVotingPowerPerWallet } from '@realms/VoteStakeRegistry/tools/deposits'
import { BN } from '@coral-xyz/anchor'
import { fetchRealmConfigQuery } from '@realms/hooks/queries/realmConfig'
import { chunks } from '@realms/utils/helpers'

async function getGovAccounts(realm: any, walletPk: PublicKey, connection: Connection) {
  const realmFilter = pubkeyFilter(1, realm.pubkey)
  const hasDelegateFilter = booleanFilter(1 + 32 + 32 + 32 + 8 + 4 + 4 + 1 + 1 + 6, true)
  const delegatedToUserFilter = pubkeyFilter(1 + 32 + 32 + 32 + 8 + 4 + 4 + 1 + 1 + 6 + 1, walletPk)
  if (!realmFilter || !delegatedToUserFilter) throw new Error() // unclear why this would ever happen, probably it just cannot

  return await getGovernanceAccounts(connection, realm.owner, TokenOwnerRecord, [
    realmFilter,
    hasDelegateFilter,
    delegatedToUserFilter,
  ])
}

async function getGovPower(
  realm: any,
  vsrClient: VsrClient,
  wallets: PublicKey[],
  connection: Connection,
  config: any,
  latestBlockhash?: BlockhashWithExpiryBlockHeight,
) {
  const programId = config.result?.account.communityTokenConfig.voterWeightAddin
  if (!vsrClient || programId === undefined) return undefined

  return await getLockTokensVotingPowerPerWallet(wallets, realm, vsrClient, connection, latestBlockhash)
}

export async function getDelegatedVotingPower(
  walletPks: PublicKey[],
  realm: any,
  vsrClient: VsrClient,
  connection: Connection,
) {
  const config = await fetchRealmConfigQuery(connection, realm.pubkey)
  const latestBlockhash = await connection.getLatestBlockhash()

  const delegators: ProgramAccount<TokenOwnerRecord>[][] = []
  for (const chunk of chunks(walletPks, 5)) {
    const dels = await Promise.all(chunk.map((w) => getGovAccounts(realm, w, connection)))
    if (dels.length) {
      delegators.push(...dels)
    }
  }

  const walletDelegatedVotingPower = walletPks.map(async (w, i) => {
    const walletDelegators = delegators[i]

    if (!walletDelegators.length) return [w.toBase58(), new BN(0)]

    const relevantDelegators = walletDelegators
      ?.filter((x) => x.account.governingTokenMint.toString() === realm?.account.communityMint.toString())
      .map((x) => x.account.governingTokenOwner)

    const delegatorPowers = await getGovPower(realm, vsrClient, relevantDelegators, connection, config, latestBlockhash)
    const totalDelegatorPower = delegatorPowers
      ? Object.values(delegatorPowers).reduce((sum: BN, curr: BN) => sum.add(curr), new BN(0))
      : new BN(0)

    console.log(w.toBase58(), totalDelegatorPower.toString())

    return [w.toBase58(), totalDelegatorPower]
  })

  return Object.fromEntries(await Promise.all(walletDelegatedVotingPower))
}
