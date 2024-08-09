import { ManagerUpdateProjectMemberInput, sdk } from '@deanslist-platform/sdk'

export function useManagerUpdateProjectMember() {
  return async (projectMemberId: string, input: ManagerUpdateProjectMemberInput) =>
    sdk
      .managerUpdateProjectMember({ projectMemberId, input })
      .then((res) => res.data)
      .then(async (res) => !!res)
}
