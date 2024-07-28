import { AdminFindManyCommunityInput, AdminUpdateCommunityInput, Community } from '@deanslist-platform/sdk'
import { getAliceCookie, getBobCookie, managerCreateCommunity, sdk, uniqueId } from '../support'

describe('api-community-feature', () => {
  describe('api-community-admin-resolver', () => {
    let communityId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      communityId = await managerCreateCommunity({ cookie: alice }).then((community) => community.id)
    })

    describe('authorized', () => {
      it('should update a community', async () => {
        const input: AdminUpdateCommunityInput = {
          name: uniqueId('community'),
        }

        const res = await sdk.adminUpdateCommunity({ communityId, input }, { cookie: alice })

        const item: Community = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of communities (find all)', async () => {
        const input: AdminFindManyCommunityInput = {
          limit: 1000,
        }

        const res = await sdk.adminFindManyCommunity({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data.find((item) => item.id === communityId)).toBeTruthy()
      })

      it('should find a list of communities (find new one)', async () => {
        const input: AdminFindManyCommunityInput = {
          search: communityId,
        }

        const res = await sdk.adminFindManyCommunity({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(communityId)
      })

      it('should find a community by id', async () => {
        const res = await sdk.adminFindOneCommunity({ communityId }, { cookie: alice })

        expect(res.data.item.id).toBe(communityId)
      })

      it('should delete a community', async () => {
        const res = await sdk.adminDeleteCommunity({ communityId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyCommunity({ input: { search: communityId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not update a community', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateCommunity({ communityId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of communities (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyCommunity({ input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a community by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneCommunity({ communityId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a community', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteCommunity({ communityId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
