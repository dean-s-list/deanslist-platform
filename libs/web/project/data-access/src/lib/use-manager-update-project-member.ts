import { ManagerUpdateProjectMemberInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'

export function useManagerUpdateProjectMember() {
  const sdk = useSdk()

  return async (projectMemberId: string, input: ManagerUpdateProjectMemberInput) =>
    sdk
      .managerUpdateProjectMember({ projectMemberId, input })
      .then((res) => res.data)
      .then(async (res) => !!res)
}
