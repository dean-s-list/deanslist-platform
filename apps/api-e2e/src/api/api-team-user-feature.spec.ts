import { Team, UserCreateTeamInput, UserFindManyTeamInput, UserUpdateTeamInput } from '@deanslist-platform/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-team-feature', () => {
  describe('api-team-user-resolver', () => {
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
    })

    describe('authorized', () => {
      it('should create a team', async () => {
        const input: UserCreateTeamInput = {
          name: uniqueId('team'),
        }

        const res = await sdk.userCreateTeam({ input }, { cookie: alice })

        const item: Team = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a team', async () => {
        const createInput: UserCreateTeamInput = {
          name: uniqueId('team'),
        }
        const createdRes = await sdk.userCreateTeam({ input: createInput }, { cookie: alice })
        const teamId = createdRes.data.created.id
        const input: UserUpdateTeamInput = { name: uniqueId('team') }

        const res = await sdk.userUpdateTeam({ teamId, input }, { cookie: alice })

        const item: Team = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of teams (find all)', async () => {
        const createInput: UserCreateTeamInput = {
          name: uniqueId('team'),
        }
        const createdRes = await sdk.userCreateTeam({ input: createInput }, { cookie: alice })
        const teamId = createdRes.data.created.id

        const input: UserFindManyTeamInput = { limit: 10000 }

        const res = await sdk.userFindManyTeam({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data.map((t) => t.id)).toContain(teamId)
      })

      it('should find a list of teams (find new one)', async () => {
        const createInput: UserCreateTeamInput = {
          name: uniqueId('team'),
        }
        const createdRes = await sdk.userCreateTeam({ input: createInput }, { cookie: alice })
        const teamId = createdRes.data.created.id

        const input: UserFindManyTeamInput = {
          search: teamId,
        }

        const res = await sdk.userFindManyTeam({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(teamId)
      })

      it('should find a team by id', async () => {
        const createInput: UserCreateTeamInput = {
          name: uniqueId('team'),
        }
        const createdRes = await sdk.userCreateTeam({ input: createInput }, { cookie: alice })
        const teamId = createdRes.data.created.id

        const res = await sdk.userFindOneTeam({ teamId }, { cookie: alice })

        expect(res.data.item.id).toBe(teamId)
      })

      it('should delete a team', async () => {
        const createInput: UserCreateTeamInput = {
          name: uniqueId('team'),
        }
        const createdRes = await sdk.userCreateTeam({ input: createInput }, { cookie: alice })
        const teamId = createdRes.data.created.id

        const res = await sdk.userDeleteTeam({ teamId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyTeam({ input: { search: teamId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      let aliceTeamId: string

      beforeAll(async () => {
        alice = await getAliceCookie()
        bob = await getBobCookie()
        aliceTeamId = await sdk
          .userCreateTeam({ input: { name: uniqueId('team') } }, { cookie: alice })
          .then((res) => res.data.created.id)
      })

      it('should not create a team', async () => {
        expect.assertions(1)
        const input: UserCreateTeamInput = { name: uniqueId('team') }

        try {
          await sdk.userCreateTeam({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('User use not an Admin')
        }
      })

      it('should not update a team', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateTeam({ teamId: aliceTeamId, input: { name: 'test' } }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not a team admin')
        }
      })

      it('should not delete a team', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteTeam({ teamId: aliceTeamId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not a team admin')
        }
      })

      it('should not add a team member', async () => {
        expect.assertions(1)
        try {
          await sdk.userAddTeamMember({ teamId: aliceTeamId, userId: 'bob' }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not a team admin')
        }
      })

      it('should not remove a team member', async () => {
        expect.assertions(1)
        try {
          await sdk.userRemoveTeamMember({ teamId: aliceTeamId, userId: 'bob' }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not a team admin')
        }
      })
    })
  })
})
