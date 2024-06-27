import { VSR_PLUGIN_PKS } from '@realms/constants/plugins'
import { useRealmVoterWeightPlugins } from '@realms/hooks/useRealmVoterWeightPlugins'

import { useVoterWeightPluginReadinessReturnType, VoterWeightPluginInfo } from './lib/types'
import { VsrClient } from '@realms/VoteStakeRegistry/sdk/client'

export interface useVsrClientReturnType extends useVoterWeightPluginReadinessReturnType {
  vsrClient: VsrClient | undefined
  plugin: VoterWeightPluginInfo | undefined
}

export const useVsrClient = (): useVsrClientReturnType => {
  const { isReady, plugins } = useRealmVoterWeightPlugins()

  const plugin = plugins?.voterWeight.find((plugin: any) => VSR_PLUGIN_PKS.includes(plugin.programId.toString()))

  const isEnabled = plugin !== undefined

  return {
    isReady,
    vsrClient: plugin?.client as unknown as VsrClient,
    plugin,
    isEnabled,
  }
}
