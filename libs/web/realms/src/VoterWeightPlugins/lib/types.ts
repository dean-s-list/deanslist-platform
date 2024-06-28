import { PublicKey } from '@solana/web3.js'
import { BN, Idl } from '@coral-xyz/anchor'
import { PluginName } from '@realms/constants/plugins'
import { Client } from '@solana/governance-program-library'

export type PluginType = 'voterWeight' | 'maxVoterWeight'

export type VoterWeightPluginInfo<TParams = unknown, TClient extends Idl = Idl> = {
  programId: PublicKey
  name: PluginName
  params: TParams
  type: PluginType
  weights: (BN | undefined)[] | undefined // the weight after applying this plugin
  registrarPublicKey: PublicKey
  client: Client<TClient>
}

export type VoterWeightPlugins = Record<PluginType, VoterWeightPluginInfo[]>

export interface useVoterWeightPluginReadinessReturnType {
  isReady: boolean //defines if the plugin is loading
  isEnabled: boolean //defines if the plugin is enabled in the realm
}
