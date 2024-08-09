import { sdk, UserUpdateUserInput } from '@deanslist-platform/sdk'
import { useAuth, useMe } from '@deanslist-platform/web-auth-data-access'
import { toastError } from '@pubkey-ui/core'
import { useUserFineOneUser } from './use-user-fine-one-user'

export function useUserProfile() {
  const me = useMe()
  const { user } = useAuth()
  const { query } = useUserFineOneUser({ username: user?.username as string })

  return {
    user: query.data?.item,
    query,
    updateUser: async (input: UserUpdateUserInput) =>
      sdk
        .userUpdateUser({
          input,
        })
        .then(async (res) => {
          await Promise.all([query.refetch(), me.refetch()])
          return !!res.data
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
