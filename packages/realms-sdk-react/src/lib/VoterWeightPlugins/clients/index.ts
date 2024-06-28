import { Provider, Wallet } from '@coral-xyz/anchor'
import { Client, GatewayClient, QuadraticClient } from '@solana/governance-program-library'
import { PublicKey } from '@solana/web3.js'
import { PluginName } from '../../constants/plugins'
import { VsrClient } from '../../VoteStakeRegistry/sdk/client'
import { UnrecognisedVoterWeightPluginClient } from './UnrecognisedVoterWeightPluginClient'

/**
 * Given a plugin name and program ID, load the appropriate client
 * Note - the program ID is ignored by some clients, but if present, must match the IDL loaded by the client.
 * @param plugin
 * @param programId
 * @param provider
 * @param signer
 */
export function loadClient(
  plugin: PluginName,
  programId: PublicKey,
  provider: Provider,
  signer: Wallet,
): Promise<Client<any>> {
  switch (plugin) {
    case 'QV':
      return QuadraticClient.connect(provider)
    case 'gateway':
      return GatewayClient.connect(provider)
    case 'VSR':
      return VsrClient.connect(provider, programId)
    default:
      return UnrecognisedVoterWeightPluginClient.connect(provider, programId)
  }
}
