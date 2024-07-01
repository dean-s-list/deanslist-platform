import { BN } from '@coral-xyz/anchor'
import {
  chunks,
  fetchRealmConfigQuery,
  getLockTokensVotingPowerPerWallet,
  VsrClient,
} from '@deanslist-platform/realms-sdk-react'
import {
  booleanFilter,
  getGovernanceAccounts,
  ProgramAccount,
  pubkeyFilter,
  Realm,
  RealmConfigAccount,
  TokenOwnerRecord,
} from '@solana/spl-governance'
import { BlockhashWithExpiryBlockHeight, Connection, PublicKey } from '@solana/web3.js'

async function getGovAccounts(realm: ProgramAccount<Realm>, walletPk: PublicKey, connection: Connection) {
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
  realm: ProgramAccount<Realm>,
  vsrClient: VsrClient,
  wallets: PublicKey[],
  connection: Connection,
  config: ProgramAccount<RealmConfigAccount> | undefined,
  latestBlockhash?: BlockhashWithExpiryBlockHeight,
) {
  const programId = config?.account.communityTokenConfig.voterWeightAddin
  if (!vsrClient || programId === undefined) return undefined

  return await getLockTokensVotingPowerPerWallet(wallets, realm, vsrClient, connection, latestBlockhash)
}

export async function getDelegatedVotingPower(
  walletPks: PublicKey[],
  realm: ProgramAccount<Realm>,
  vsrClient: VsrClient,
  connection: Connection,
) {
  const config = (await fetchRealmConfigQuery(connection, realm.pubkey)).result

  const latestBlockhash = await connection.getLatestBlockhash()

  const delegators: ProgramAccount<TokenOwnerRecord>[][] = []
  for (const chunk of chunks(walletPks, 5)) {
    const delegatorsChunk = await Promise.all(chunk.map((w) => getGovAccounts(realm, w, connection)))
    delegators.push(...delegatorsChunk)
  }

  const walletDelegatedVotingPower = walletPks.map(async (walletPk, i) => {
    const walletDelegators = delegators[i]

    if (!walletDelegators.length) return [walletPk.toBase58(), new BN(0)]

    const relevantDelegators = walletDelegators
      ?.filter((x) => x.account.governingTokenMint.toString() === realm?.account.communityMint.toString())
      .map((x) => x.account.governingTokenOwner)

    const delegatorPowers = await getGovPower(realm, vsrClient, relevantDelegators, connection, config, latestBlockhash)
    const totalDelegatorPower = delegatorPowers
      ? Object.values(delegatorPowers).reduce((sum: BN, curr: BN) => sum.add(curr), new BN(0))
      : new BN(0)

    return [walletPk.toBase58(), totalDelegatorPower]
  })

  return Object.fromEntries(await Promise.all(walletDelegatedVotingPower))
}
