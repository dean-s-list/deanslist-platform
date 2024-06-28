import { getRealmConfig, getRealmConfigAddress } from '@solana/spl-governance'
import { Connection, PublicKey } from '@solana/web3.js'

import { fetchRealmByPubkey, queryClient } from '../../hooks'
import { asFindable } from '../../utils'

export const realmConfigQueryKeys = {
  all: (endpoint: string) => [endpoint, 'RealmConfig'],
  byRealm: (endpoint: string, k: PublicKey) => [...realmConfigQueryKeys.all(endpoint), 'for Realm', k],
}

export const fetchRealmConfigQuery = async (connection: Connection, realmPk: PublicKey) =>
  queryClient.fetchQuery({
    queryKey: realmConfigQueryKeys.byRealm(connection.rpcEndpoint, realmPk),
    queryFn: async () => {
      const { result: realm } = await fetchRealmByPubkey(connection, realmPk)
      if (realm === undefined) throw new Error()

      const realmConfigPk = await getRealmConfigAddress(realm.owner, realm.pubkey)
      return asFindable(getRealmConfig)(connection, realmConfigPk)
    },
  })
