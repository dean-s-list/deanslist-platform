import { VSR_PLUGIN_PKS } from '../constants/plugins'
import { useRealmQuery } from '../hooks/queries/realm'
import useWalletOnePointOh from '../hooks/useWalletOnePointOh'
import { VsrClient } from '../VoteStakeRegistry/sdk/client'
import { usePlugins } from './hooks/usePlugins'
import { useVoterWeightPluginReadinessReturnType, VoterWeightPluginInfo } from './lib/types'

export type GovernanceRole = 'council' | 'community'

export interface useVsrClientReturnType extends useVoterWeightPluginReadinessReturnType {
  vsrClient: VsrClient | undefined
  plugin: VoterWeightPluginInfo | undefined
}

export const useVsrClient = (role: GovernanceRole = 'community'): useVsrClientReturnType => {
  const wallet = useWalletOnePointOh()
  const realm = useRealmQuery().data?.result

  const governanceMintPublicKey =
    role === 'community' ? realm?.account.communityMint : realm?.account.config.councilMint

  const mainWalletPk = wallet?.publicKey

  const walletPublicKeys = mainWalletPk ? [mainWalletPk] : []

  const { data: plugins } = usePlugins({
    realmPublicKey: realm?.pubkey,
    governanceMintPublicKey,
    walletPublicKeys,
  })

  const plugin = plugins?.voterWeight.find((plugin: any) => VSR_PLUGIN_PKS.includes(plugin.programId.toString()))

  const isEnabled = plugin !== undefined

  return {
    isReady: isEnabled,
    vsrClient: plugin?.client as unknown as VsrClient,
    plugin,
    isEnabled,
  }
}
