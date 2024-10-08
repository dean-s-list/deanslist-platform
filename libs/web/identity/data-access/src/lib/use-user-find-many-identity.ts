import { Identity, IdentityProvider, sdk, type UserFindManyIdentityInput } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUserFindManyIdentity({ username }: { username: string }) {
  const input: UserFindManyIdentityInput = useMemo(() => ({ username }), [username])
  const query = useQuery({
    queryKey: ['user', 'find-many-identity', input],
    queryFn: () => sdk.userFindManyIdentity({ input }).then((res) => res?.data),
  })

  const grouped: { provider: IdentityProvider; items: Identity[] }[] = useMemo(() => {
    if (!query.data) {
      return []
    }
    const items = (query.data?.items ?? []).filter((item) => item.provider !== IdentityProvider.Discord)
    return items.reduce(
      (acc, item) => {
        const existing = acc.find((x) => x.provider === item.provider)
        if (existing) {
          existing.items.push(item)
        } else {
          acc.push({ provider: item.provider, items: [item] })
        }
        return acc
      },
      [{ provider: IdentityProvider.Solana, items: [] }] as { provider: IdentityProvider; items: Identity[] }[],
    )
  }, [query.data])

  const items = query.data?.items ?? []

  const discordIdentity = items.find((x) => x.provider === IdentityProvider.Discord)

  return {
    expiredDiscord: discordIdentity?.expired ?? false,
    grouped,
    hasDiscord: !!discordIdentity,
    hasSolana: items.some((x) => x.provider === IdentityProvider.Solana),
    items,
    query,
    deleteIdentity(identityId: string) {
      if (!window.confirm('Are you sure?')) {
        return
      }
      sdk
        .userDeleteIdentity({ identityId })
        .then(() => {
          toastSuccess('Identity deleted')
        })
        .catch((res) => {
          toastError({ title: 'Error deleting identity', message: `${res}` })
        })
        .finally(() => query.refetch())
    },
    setPrimaryIdentity(identityId: string) {
      sdk
        .userSetPrimaryIdentity({ identityId })
        .then(async (res) => {
          if (res.data.set?.primary) {
            toastSuccess('Identity set as primary')
          } else {
            toastError(`Error setting identity as primary`)
          }
          await query.refetch()
        })
        .catch((res) => {
          toastError({ title: 'Error setting identity as primary', message: `${res}` })
        })
    },
  }
}
