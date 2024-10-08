import {
  AdminCreateIdentityInput,
  AdminFindManyIdentityInput,
  Identity,
  IdentityProvider,
  sdk,
} from '@deanslist-platform/sdk'
import { modals } from '@mantine/modals'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyIdentity({ ownerId, provider }: { ownerId?: string; provider?: IdentityProvider }) {
  const [input] = useState<AdminFindManyIdentityInput>({
    ownerId: ownerId,
    provider: provider,
  })

  const query = useQuery({
    queryKey: ['admin', 'find-many-identity', input],
    queryFn: () => sdk.adminFindManyIdentity({ input }).then((res) => res.data),
  })

  return {
    items: query.data?.items ?? [],
    query,
    createIdentity: async (input: AdminCreateIdentityInput) => {
      if (!ownerId) {
        toastError('No owner ID')
        return false
      }
      try {
        const res = await sdk.adminCreateIdentity({ input: { ...input, ownerId } })

        if (res) {
          toastSuccess('Identity created')
          modals.closeAll()
          await query.refetch()
          return true
        }
        toastError('Error creating identity')
        return false
      } catch (err) {
        toastError(`${err}`)
        return false
      }
    },
    deleteIdentity: (identity: Identity) => {
      return sdk.adminDeleteIdentity({ identityId: identity.id }).then(async (res) => {
        if (res) {
          toastSuccess('Identity deleted')
          await query.refetch()
          return true
        }
        toastError('Error deleting identity')
        return false
      })
    },
  }
}
