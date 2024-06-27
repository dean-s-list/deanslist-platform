import {
  Community,
  UserCreateCommunityInput,
  UserFindManyCommunityInput,
  UserUpdateCommunityInput,
} from '@deanslist-platform/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-community-feature', () => {
  describe('api-community-user-resolver', () => {
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
    })

    describe('authorized', () => {
      it('should create a community', async () => {
        const input: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }

        const res = await sdk.managerCreateCommunity({ input }, { cookie: alice })

        const item: Community = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a community', async () => {
        const createInput: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.managerCreateCommunity({ input: createInput }, { cookie: alice })
        const communityId = createdRes.data.created.id
        const input: UserUpdateCommunityInput = { name: uniqueId('community') }

        const res = await sdk.userUpdateCommunity({ communityId, input }, { cookie: alice })

        const item: Community = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of communities (find all)', async () => {
        const createInput: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.managerCreateCommunity({ input: createInput }, { cookie: alice })
        const communityId = createdRes.data.created.id

        const input: UserFindManyCommunityInput = { limit: 10000 }

        const res = await sdk.userFindManyCommunity({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data.map((t) => t.id)).toContain(communityId)
      })

      it('should find a list of communities (find new one)', async () => {
        const createInput: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.managerCreateCommunity({ input: createInput }, { cookie: alice })
        const communityId = createdRes.data.created.id

        const input: UserFindManyCommunityInput = {
          search: communityId,
        }

        const res = await sdk.userFindManyCommunity({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(communityId)
      })

      it('should find a community by id', async () => {
        const createInput: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.managerCreateCommunity({ input: createInput }, { cookie: alice })
        const communityId = createdRes.data.created.id

        const res = await sdk.userFindOneCommunity({ communityId }, { cookie: alice })

        expect(res.data.item.id).toBe(communityId)
      })

      it('should delete a community', async () => {
        const createInput: UserCreateCommunityInput = {
          name: uniqueId('community'),
        }
        const createdRes = await sdk.managerCreateCommunity({ input: createInput }, { cookie: alice })
        const communityId = createdRes.data.created.id

        const res = await sdk.managerDeleteCommunity({ communityId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyCommunity({ input: { search: communityId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      let aliceCommunityId: string

      beforeAll(async () => {
        alice = await getAliceCookie()
        bob = await getBobCookie()
        aliceCommunityId = await sdk
          .managerCreateCommunity({ input: { name: uniqueId('community') } }, { cookie: alice })
          .then((res) => res.data.created.id)
      })

      it('should not create a community', async () => {
        expect.assertions(1)
        const input: UserCreateCommunityInput = { name: uniqueId('community') }

        try {
          await sdk.managerCreateCommunity({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('User use not an Admin')
        }
      })

      it('should not update a community', async () => {
        expect.assertions(1)
        try {
          await sdk.managerUpdateCommunity({ communityId: aliceCommunityId, input: { name: 'test' } }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not a community admin')
        }
      })

      it('should not delete a community', async () => {
        expect.assertions(1)
        try {
          await sdk.managerDeleteCommunity({ communityId: aliceCommunityId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not a community admin')
        }
      })

      it('should not add a community member', async () => {
        expect.assertions(1)
        try {
          await sdk.managerAddCommunityMember({ communityId: aliceCommunityId, userId: 'bob' }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not a community admin')
        }
      })

      it('should not remove a community member', async () => {
        expect.assertions(1)
        try {
          await sdk.managerRemoveCommunityMember({ communityId: aliceCommunityId, userId: 'bob' }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not a community admin')
        }
      })
    })
  })
})
