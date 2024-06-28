import { AnchorProvider, Wallet } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useRealmsConnection } from '../../connection'
import useWalletOnePointOh from '../../hooks/useWalletOnePointOh'
import { getPlugins } from '../lib/getPlugins'
import { VoterWeightPlugins } from '../lib/types'

type Args = {
  realmPublicKey?: PublicKey
  governanceMintPublicKey?: PublicKey
  walletPublicKeys?: PublicKey[]
}

export function usePlugins(args: Args): UseQueryResult<VoterWeightPlugins, unknown> {
  const { connection } = useRealmsConnection()
  const wallet = useWalletOnePointOh()
  const signer = wallet as unknown as Wallet
  const provider = wallet && new AnchorProvider(connection, signer, AnchorProvider.defaultOptions())

  const queryKeys = [
    'getPlugins',
    args.realmPublicKey?.toString(),
    args.governanceMintPublicKey?.toString(),
    args.walletPublicKeys?.map((pubkey) => pubkey.toString()).join(','),
  ]

  // Cache plugin loading with react-query
  return useQuery<VoterWeightPlugins>({
    queryKey: queryKeys,
    queryFn: async () => {
      if (!args.walletPublicKeys || !provider) {
        return {
          voterWeight: [],
          maxVoterWeight: [],
        }
      }

      // Load the voter weight plugins associated with the realm and governance
      const voterWeightPluginsPromise = getPlugins({
        ...(args as Required<Args>),
        provider,
        type: 'voterWeight',
        wallets: args.walletPublicKeys,
        signer,
      })
      // Load the max voter weight plugins associated with the realm and governance
      const maxVoterWeightPluginsPromise = getPlugins({
        ...(args as Required<Args>),
        provider,
        type: 'maxVoterWeight',
        wallets: args.walletPublicKeys,
        signer,
      })

      const [voterWeightPlugins, maxVoterWeightPlugins] = await Promise.all([
        voterWeightPluginsPromise,
        maxVoterWeightPluginsPromise,
      ])

      return {
        voterWeight: voterWeightPlugins,
        maxVoterWeight: maxVoterWeightPlugins,
      }
    },
  })
}
