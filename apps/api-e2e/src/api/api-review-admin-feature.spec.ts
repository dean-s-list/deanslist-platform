import { AdminFindManyReviewInput } from '@deanslist-platform/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-review-feature', () => {
  describe('api-review-admin-resolver', () => {
    let reviewId: string
    let teamId: string
    let projectId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      teamId = await sdk
        .userCreateTeam({ input: { name: uniqueId('team') } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      beforeEach(async () => {
        projectId = await sdk
          .userCreateProject({ input: { teamId, name: uniqueId('project') } }, { cookie: alice })
          .then((res) => res.data.created.id)
        reviewId = await sdk.userCreateReview({ projectId }, { cookie: alice }).then((res) => res.data.created.id)
      })

      it('should find a list of reviews (find all)', async () => {
        const input: AdminFindManyReviewInput = { projectId }

        const res = await sdk.adminFindManyReview({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(reviewId)
      })

      it('should find a list of reviews (find new one)', async () => {
        const input: AdminFindManyReviewInput = {
          projectId,
          search: reviewId,
        }

        const res = await sdk.adminFindManyReview({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(reviewId)
      })

      it('should find a review by id', async () => {
        const res = await sdk.adminFindOneReview({ reviewId }, { cookie: alice })

        expect(res.data.item.id).toBe(reviewId)
      })

      it('should delete a review', async () => {
        const res = await sdk.adminDeleteReview({ reviewId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyReview({ input: { projectId, search: reviewId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not find a list of reviews (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyReview({ input: { projectId } }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a review by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneReview({ reviewId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a review', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteReview({ reviewId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
