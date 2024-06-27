import { EndpointTypes } from '@realms/models/types'
import { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import asFindable from '@realms/utils/queries/asFindable'
import { tryGetMint } from '@realms/utils/tokens'
import useLegacyConnectionContext from '@realms/hooks/useLegacyConnectionContext'

export const mintInfoQueryKeys = {
  all: (cluster: EndpointTypes) => [cluster, 'MintInfo'],
  byPubkey: (cluster: EndpointTypes, k: PublicKey) => [...mintInfoQueryKeys.all(cluster), k.toString()],
}

export const useMintInfoByPubkeyQuery = (pubkey: PublicKey | undefined) => {
  const connection = useLegacyConnectionContext()

  const enabled = pubkey !== undefined
  const query = useQuery({
    queryKey: enabled ? Object.freeze(mintInfoQueryKeys.byPubkey(connection.cluster, pubkey)) : [],
    queryFn: async () => {
      if (!enabled) throw new Error()
      return asFindable((...x: Parameters<typeof tryGetMint>) => tryGetMint(...x).then((x) => x?.account))(
        connection.current,
        pubkey,
      )
    },
    enabled,
  })

  return query
}

// export const useRealmCouncilMintInfoQuery = () => {
//   const realm = useRealmQuery().data?.result
//   const mint = realm?.account.config.councilMint
//   return useMintInfoByPubkeyQuery(mint)
// }
//
// export const useRealmCommunityMintInfoQuery = () => {
//   const realm = useRealmQuery().data?.result
//   const mint = realm?.account.communityMint
//   return useMintInfoByPubkeyQuery(mint)
// }
//
// export const fetchMintInfoByPubkey = (
//   connection: Connection,
//   pubkey: PublicKey
// ) => {
//   const cluster = getNetworkFromEndpoint(connection.rpcEndpoint)
//   return queryClient.fetchQuery({
//     queryKey: mintInfoQueryKeys.byPubkey(cluster, pubkey),
//     queryFn: () =>
//       asFindable((...x: Parameters<typeof tryGetMint>) =>
//         tryGetMint(...x).then((x) => x?.account)
//       )(connection, pubkey),
//   })
// }
