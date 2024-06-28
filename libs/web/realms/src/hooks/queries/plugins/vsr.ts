import { BN, EventParser, Program } from '@coral-xyz/anchor'
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import { SIMULATION_WALLET } from '@realms/tools/constants'
import { IDL, VoterStakeRegistry } from '@realms/VoteStakeRegistry/sdk/voter_stake_registry'
import queryClient from '../queryClient'

const VOTER_INFO_EVENT_NAME = 'VoterInfo'

export const vsrQueryKeys = {
  all: (connection: Connection) => [connection.rpcEndpoint, 'VSR'],
  allVotingPower: (connection: Connection, pluginId: PublicKey) => [
    ...vsrQueryKeys.all(connection),
    pluginId.toString(),
    'voting power',
  ],
  votingPower: (connection: Connection, pluginId: PublicKey, registrarPk: PublicKey, voterPk: PublicKey) => [
    ...vsrQueryKeys.allVotingPower(connection, pluginId),
    registrarPk.toString(),
    voterPk.toString(),
  ],
}

const extractVotingPowerFromSimulation = (logs: Awaited<ReturnType<typeof voterPowerLogQueryFn>>) => {
  const votingPowerEntry = logs.find((x) => x.name === VOTER_INFO_EVENT_NAME)
  const votingPower = votingPowerEntry
    ? ({
        found: true,
        result: votingPowerEntry.data.votingPower as BN,
      } as const)
    : ({ found: false, result: undefined } as const)
  return votingPower
}

const votingPowerQueryFn = async (
  connection: Connection,
  pluginId: PublicKey,
  registrarPk: PublicKey,
  voterPk: PublicKey,
) => {
  const program = new Program<VoterStakeRegistry>(IDL, pluginId, {
    connection,
  })
  const logs = await fetchVotingPowerSimulation(connection, program, registrarPk, voterPk)
  const votingPower = extractVotingPowerFromSimulation(logs)
  return votingPower
}

export const fetchVotingPower = (
  connection: Connection,
  pluginId: PublicKey,
  registrarPk: PublicKey,
  voterPk: PublicKey,
) =>
  queryClient.fetchQuery({
    queryKey: vsrQueryKeys.votingPower(connection, pluginId, registrarPk, voterPk),
    queryFn: () => votingPowerQueryFn(connection, pluginId, registrarPk, voterPk),
  })

export const fetchVotingPowerSimulation = (
  connection: Connection,
  program: Program<VoterStakeRegistry>,
  registrarPk: PublicKey,
  voterPk: PublicKey,
  depositEntryBegin = 0,
  depositEntryCount = 0,
) =>
  queryClient.fetchQuery({
    queryKey: [
      connection.rpcEndpoint,
      'VSR',
      'voting power',
      'simulation',
      registrarPk.toString(),
      voterPk.toString(),
      depositEntryBegin,
      depositEntryCount,
    ],
    queryFn: () =>
      voterPowerLogQueryFn(connection, program, registrarPk, voterPk, depositEntryBegin, depositEntryCount),
  })

/**
 * this code is based on VoteStakeRegistry/tools/deposits.ts
 */
const voterPowerLogQueryFn = async (
  connection: Connection,
  program: Program<VoterStakeRegistry>,
  registrar: PublicKey,
  voter: PublicKey,
  depositEntryBegin = 0,
  depositEntryCount = 0,
) => {
  const ix = await program.methods
    .logVoterInfo(depositEntryBegin, depositEntryCount)
    .accounts({ registrar, voter })
    .instruction()
  const transaction = new Transaction({
    feePayer: new PublicKey(SIMULATION_WALLET),
  }).add(ix)
  const sim = await connection.simulateTransaction(transaction)
  const parser = new EventParser(program.programId, program.coder)
  if (sim.value.logs === null) {
    console.error('log_voter_info returned no logs')
    return []
  }
  return [...parser.parseLogs(sim.value.logs)]
}
