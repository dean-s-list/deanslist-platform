import useSelectedRealmPubkey from '@realms/hooks/selectedRealm/useSelectedRealmPubkey'
import { getRealm } from '@solana/spl-governance'
import { Connection, PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import asFindable from '@realms/utils/queries/asFindable'
import { getNetworkFromEndpoint } from '@realms/utils/connection'
import queryClient from './queryClient'
import { useRealmsConnection } from '@realms/connection'

export const realmQueryKeys = {
  all: (endpoint: string) => [endpoint, 'Realm'],
  byPubkey: (endpoint: string, k: PublicKey) => [...realmQueryKeys.all(endpoint), k.toString()],
  byProgram: (endpoint: string, program: PublicKey) => [...realmQueryKeys.all(endpoint), 'by Program', program],
}

export const useRealmByPubkeyQuery = (realmPk: undefined | PublicKey) => {
  const { connection } = useRealmsConnection()

  const enabled = realmPk !== undefined
  return useQuery({
    queryKey: enabled ? Object.freeze(realmQueryKeys.byPubkey(connection.rpcEndpoint, realmPk)) : [],
    queryFn: async () => {
      if (!enabled) throw new Error()
      return asFindable(getRealm)(connection, realmPk)
    },
    staleTime: 3600000, // 1 hour
    enabled,
  })
}

export const useRealmQuery = () => {
  const pubkey = useSelectedRealmPubkey()
  return useRealmByPubkeyQuery(pubkey)
}

export const fetchRealmByPubkey = (connection: Connection, pubkey: PublicKey) => {
  const endpoint = getNetworkFromEndpoint(connection.rpcEndpoint)
  return queryClient.fetchQuery({
    queryKey: realmQueryKeys.byPubkey(endpoint, pubkey),
    queryFn: () => asFindable(() => getRealm(connection, pubkey))(),
  })
}
