import { BN, EventParser, Idl, Program } from '@coral-xyz/anchor'
import { ProgramAccount, Realm } from '@solana/spl-governance'
import { BlockhashWithExpiryBlockHeight, Connection, PublicKey, Transaction } from '@solana/web3.js'
import { SIMULATION_WALLET } from '../../tools/constants'
import { DAYS_PER_MONTH, SECS_PER_DAY } from '../../utils/dateTools'
import { chunks } from '../../utils/helpers'
import { getRegistrarPDA, getVoterPDA, Registrar, Voter } from '../sdk/accounts'
import { tryGetRegistrar } from '../sdk/api'
import { VsrClient } from '../sdk/client'

const VOTER_INFO_EVENT_NAME = 'VoterInfo'
// The wallet can be any existing account for the simulation
// Note: when running a local validator ensure the account is copied from devnet: --clone ENmcpFCpxN1CqyUjuog9yyUVfdXBKF3LVCwLr7grJZpk -ud

const logsToEvents = <T extends Idl>(
  program: Program<T>,
  logs: string[],
  walletPk: string,
): {
  walletPk: string
  event: any
}[] => {
  const parser = new EventParser(program.programId, program.coder)
  const errors = parser.parseLogs(logs)
  return [...errors].map((event) => ({ event, walletPk }))
}

const getVotingPowersForWallets = async ({
  client,
  registrarPk,
  existingRegistrar,
  walletPks,
  connection,
  latestBlockhash,
}: {
  client: VsrClient
  connection: Connection
  registrarPk: PublicKey
  existingRegistrar: Registrar
  walletPks: PublicKey[]
  latestBlockhash: Readonly<{
    blockhash: string
    lastValidBlockHeight: number
  }>
}) => {
  const clientProgramId = client.program.programId
  const voterPks: PublicKey[] = []
  const voters: (Voter | null)[] = []
  const encodedTransactionsParsedByWallets: {
    walletPk: string
    tx: string
  }[] = []
  const mintCfgs = existingRegistrar.votingMints
  const events: {
    walletPk: string
    event: any
  }[] = []
  for (const walletPk of walletPks) {
    const { voter } = getVoterPDA(registrarPk, walletPk, clientProgramId)
    voterPks.push(voter)
  }

  const voterAccsResponse = await client?.program.account.voter.fetchMultiple(voterPks)
  voters.push(...(voterAccsResponse as (Voter | null)[]))

  if (voters.length) {
    for (const i in voters) {
      const voter = voters[i]
      const voterPk = voterPks[i]
      if (voter) {
        const hasDepositsWithCommunityMint = voter.deposits.find(
          (x) => x.isUsed && mintCfgs[x.votingMintConfigIdx].baselineVoteWeightScaledFactor.gtn(0),
        )
        if (hasDepositsWithCommunityMint) {
          const simulationWallet = new PublicKey(SIMULATION_WALLET)

          const originalTx = new Transaction({ feePayer: simulationWallet })
          const logVoterInfoIx = await client.program.methods
            .logVoterInfo(1, 1)
            .accounts({ registrar: registrarPk, voter: voterPk })
            .instruction()
          originalTx.add(logVoterInfoIx)

          const transaction = originalTx
          transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight
          transaction.recentBlockhash = latestBlockhash.blockhash
          //@ts-ignore
          const message = transaction._compile()
          const signData = message.serialize()
          //@ts-ignore
          const wireTransaction = transaction._serialize(signData)
          const encodedTransaction = wireTransaction.toString('base64')
          encodedTransactionsParsedByWallets.push({
            walletPk: voter.voterAuthority.toBase58(),
            tx: encodedTransaction,
          })
        }
      }
    }

    const chunkedEncodedTransactionsParsed = chunks(encodedTransactionsParsedByWallets, 100)
    // TODO Batch alert
    const simulations = await Promise.all(
      chunkedEncodedTransactionsParsed.map((txChunk) =>
        fetch(connection.rpcEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([
            ...txChunk.map((encodedTransaction) => ({
              jsonrpc: '2.0',
              id: encodedTransaction.walletPk,
              method: 'simulateTransaction',
              params: [
                encodedTransaction.tx,
                {
                  commitment: 'recent',
                  encoding: 'base64',
                },
              ],
            })),
          ]),
        }),
      ),
    )
    const logsJsons = await Promise.all(simulations.map((x: any) => x.json()))
    for (const logJson of logsJsons) {
      for (const result of logJson) {
        events.push(...logsToEvents(client.program, result.result.value.logs!, result.id))
      }
    }

    const votingPowersPerWallet = events
      .filter((x) => x.event.name === VOTER_INFO_EVENT_NAME)
      .map((x) => ({
        walletPk: x.walletPk,
        votingPower: (x.event?.data?.votingPower as BN) || new BN(0),
      }))
    return votingPowersPerWallet
  }
  return null
}

export const calcMultiplier = ({
  depositScaledFactor,
  maxExtraLockupVoteWeightScaledFactor,
  lockupSecs,
  lockupSaturationSecs,
  isVested = false,
}: {
  depositScaledFactor: number
  maxExtraLockupVoteWeightScaledFactor: number
  lockupSecs: number
  lockupSaturationSecs: number
  isVested?: boolean
}) => {
  if (isVested) {
    const onMonthSecs = SECS_PER_DAY * DAYS_PER_MONTH
    const n_periods_before_saturation = lockupSaturationSecs / onMonthSecs
    const n_periods = lockupSecs / onMonthSecs
    const n_unsaturated_periods = Math.min(n_periods, n_periods_before_saturation)
    const n_saturated_periods = Math.max(0, n_periods - n_unsaturated_periods)
    const calc =
      (depositScaledFactor +
        (maxExtraLockupVoteWeightScaledFactor / n_periods) *
          (n_saturated_periods +
            ((n_unsaturated_periods + 1) * n_unsaturated_periods) / 2 / n_periods_before_saturation)) /
      depositScaledFactor
    return depositScaledFactor !== 0 ? calc : 0
  }
  const calc =
    (depositScaledFactor +
      (maxExtraLockupVoteWeightScaledFactor * Math.min(lockupSecs, lockupSaturationSecs)) / lockupSaturationSecs) /
    depositScaledFactor
  return depositScaledFactor !== 0 ? calc : 0
}

export const getLockTokensVotingPowerPerWallet = async (
  walletsPks: PublicKey[],
  realm: ProgramAccount<Realm>,
  client: VsrClient,
  connection: Connection,
  latestBlockhash?: BlockhashWithExpiryBlockHeight,
) => {
  const { registrar } = getRegistrarPDA(realm.pubkey, realm.account.communityMint, client.program.programId)
  const existingRegistrar = await tryGetRegistrar(registrar, client)

  const _latestBlockhash = latestBlockhash || (await connection.getLatestBlockhash())
  const votingPowers = await getVotingPowersForWallets({
    client: client,
    registrarPk: registrar,
    existingRegistrar: existingRegistrar!,
    walletPks: walletsPks,
    connection: connection,
    latestBlockhash: _latestBlockhash,
  })

  if (votingPowers) {
    const votingPowerObj: Record<string, BN> = {}
    for (const record of votingPowers) {
      votingPowerObj[record.walletPk] = record.votingPower
    }

    return votingPowerObj
  }
  return {}
}
