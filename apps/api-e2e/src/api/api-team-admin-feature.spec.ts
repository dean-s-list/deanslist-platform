import { AdminFindManyTeamInput, AdminUpdateTeamInput, Team } from '@deanslist-platform/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-team-feature', () => {
  describe('api-team-admin-resolver', () => {
    let teamId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      teamId = await sdk
        .userCreateTeam({ input: { name: uniqueId('team') } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should update a team', async () => {
        const input: AdminUpdateTeamInput = {
          name: uniqueId('team'),
        }

        const res = await sdk.adminUpdateTeam({ teamId, input }, { cookie: alice })

        const item: Team = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of teams (find all)', async () => {
        const input: AdminFindManyTeamInput = {
          limit: 1000,
        }

        const res = await sdk.adminFindManyTeam({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data.find((item) => item.id === teamId)).toBeTruthy()
      })

      it('should find a list of teams (find new one)', async () => {
        const input: AdminFindManyTeamInput = {
          search: teamId,
        }

        const res = await sdk.adminFindManyTeam({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(teamId)
      })

      it('should find a team by id', async () => {
        const res = await sdk.adminFindOneTeam({ teamId }, { cookie: alice })

        expect(res.data.item.id).toBe(teamId)
      })

      it('should delete a team', async () => {
        const res = await sdk.adminDeleteTeam({ teamId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyTeam({ input: { search: teamId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not update a team', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateTeam({ teamId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of teams (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyTeam({ input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a team by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneTeam({ teamId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a team', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteTeam({ teamId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
