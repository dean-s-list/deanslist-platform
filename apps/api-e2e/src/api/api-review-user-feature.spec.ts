import { UserFindManyReviewInput } from '@deanslist-platform/sdk'
import { getAliceCookie, sdk, uniqueId } from '../support'

describe('api-review-feature', () => {
  describe('api-review-user-resolver', () => {
    let reviewId: string
    let communityId: string
    let projectId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      communityId = await sdk
        .userCreateCommunity({ input: { name: uniqueId('community') } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      beforeEach(async () => {
        projectId = await sdk
          .userCreateProject({ input: { communityId, name: uniqueId('project') } }, { cookie: alice })
          .then((res) => res.data.created.id)
      })

      it('should create a review', async () => {
        const createdRes = await sdk.userCreateReview({ projectId }, { cookie: alice })
        const item = createdRes.data.created
        expect(item.projectId).toBe(projectId)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should find a list of reviews (find all)', async () => {
        const createdRes = await sdk.userCreateReview({ projectId }, { cookie: alice })
        const reviewId = createdRes.data.created.id

        const input: UserFindManyReviewInput = { projectId }

        const res = await sdk.userFindManyReview({ input }, { cookie: alice })

        expect(res.data.items.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.items.find((item) => item.id === reviewId)).toBeTruthy()
      })

      it('should find a list of reviews (find new one)', async () => {
        const createdRes = await sdk.userCreateReview({ projectId }, { cookie: alice })
        const reviewId = createdRes.data.created.id

        const input: UserFindManyReviewInput = {
          projectId,
          search: reviewId,
        }

        const res = await sdk.userFindManyReview({ input }, { cookie: alice })

        expect(res.data.items.length).toBe(1)
        expect(res.data.items.find((item) => item.id === reviewId)).toBeTruthy()
      })

      it('should find a review by id', async () => {
        const createdRes = await sdk.userCreateReview({ projectId }, { cookie: alice })
        const reviewId = createdRes.data.created.id

        const res = await sdk.userFindOneReview({ reviewId }, { cookie: alice })

        expect(res.data.item.id).toBe(reviewId)
      })

      it('should delete a review', async () => {
        const createdRes = await sdk.userCreateReview({ projectId }, { cookie: alice })
        const reviewId = createdRes.data.created.id

        const res = await sdk.userDeleteReview({ reviewId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyReview({ input: { projectId, search: reviewId } }, { cookie: alice })
        expect(findRes.data.items.length).toBe(0)
      })
    })
  })
})
