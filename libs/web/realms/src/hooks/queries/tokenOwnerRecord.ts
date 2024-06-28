import { booleanFilter, getGovernanceAccounts, pubkeyFilter, TokenOwnerRecord } from '@solana/spl-governance'
import { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { useRealmQuery } from './realm'
import useLegacyConnectionContext from '../useLegacyConnectionContext'

export const tokenOwnerRecordQueryKeys = {
  all: (endpoint: string) => [endpoint, 'TokenOwnerRecord'],
  byPubkey: (endpoint: string, k: PublicKey) => [...tokenOwnerRecordQueryKeys.all(endpoint), k.toString()],
  byRealm: (endpoint: string, realm: PublicKey) => [
    ...tokenOwnerRecordQueryKeys.all(endpoint),
    'by Realm',
    realm.toString(),
  ],
  byRealmXDelegate: (endpoint: string, realm: PublicKey, delegate: PublicKey) => [
    ...tokenOwnerRecordQueryKeys.byRealm(endpoint, realm),
    'by Delegate',
    delegate.toString(),
  ],

  byProgramXOwner: (endpoint: string, program: PublicKey, owner: PublicKey) => [
    ...tokenOwnerRecordQueryKeys.all(endpoint),
    'by Program',
    program.toString(),
    'by Owner',
    owner.toString(),
  ],
}

// 1 + 32 + 32 + 32 + 8 + 4 + 4 + 1 + 1 + 6
// TODO filter in the gPA (would need rpc to also index)
export const useTokenOwnerRecordsDelegatedToUser = (walletPk: PublicKey | undefined) => {
  const connection = useLegacyConnectionContext()
  const realm = useRealmQuery().data?.result
  const enabled = realm !== undefined && walletPk !== undefined
  const query = useQuery({
    queryKey: enabled
      ? Object.freeze(
          tokenOwnerRecordQueryKeys.byRealmXDelegate(connection.current.rpcEndpoint, realm.pubkey, walletPk),
        )
      : [],
    queryFn: async () => {
      if (!enabled) throw new Error()

      const realmFilter = pubkeyFilter(1, realm.pubkey)
      const hasDelegateFilter = booleanFilter(1 + 32 + 32 + 32 + 8 + 4 + 4 + 1 + 1 + 6, true)
      const delegatedToUserFilter = pubkeyFilter(1 + 32 + 32 + 32 + 8 + 4 + 4 + 1 + 1 + 6 + 1, walletPk)
      if (!realmFilter || !delegatedToUserFilter) throw new Error() // unclear why this would ever happen, probably it just cannot

      const results = await getGovernanceAccounts(connection.current, realm.owner, TokenOwnerRecord, [
        realmFilter,
        hasDelegateFilter,
        delegatedToUserFilter,
      ])

      // This may or may not be resource intensive for big DAOs, and is not too useful
      /*
      results.forEach((x) => {
        queryClient.setQueryData(
          tokenOwnerRecordQueryKeys.byPubkey(connection.cluster, x.pubkey),
          { found: true, result: x }
        )
      }) */

      return results
    },
    enabled,
  })

  return query
}
