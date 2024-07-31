import { ManagerFindManyReviewByProjectInput } from '@deanslist-platform/sdk'
import { adminUpdateProjectStatusActive, getAliceCookie, managerCreateCommunityWithProject, sdk } from '../support'

describe('api-review-feature', () => {
  describe('api-review-user-resolver', () => {
    let projectId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
    })

    describe('authorized', () => {
      beforeEach(async () => {
        const { project } = await managerCreateCommunityWithProject({ cookie: alice })
        projectId = project.id
        await adminUpdateProjectStatusActive({ cookie: alice, projectId })
      })

      it('should create a review', async () => {
        const createdRes = await sdk.reviewerCreateReview({ projectId }, { cookie: alice })
        const item = createdRes.data.created
        expect(item.projectMember?.projectId).toBe(projectId)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should find a list of reviews (find all)', async () => {
        const createdRes = await sdk.reviewerCreateReview({ projectId }, { cookie: alice })
        const reviewId = createdRes.data.created.id

        const input: ManagerFindManyReviewByProjectInput = { projectId }

        const res = await sdk.reviewerFindManyReviewByProject({ input }, { cookie: alice })

        expect(res.data.items.length).toBeGreaterThanOrEqual(1)
        // First item should be the one we created above
        expect(res.data.items.find((item) => item.id === reviewId)).toBeTruthy()
      })

      it('should find a list of reviews (find new one)', async () => {
        const createdRes = await sdk.reviewerCreateReview({ projectId }, { cookie: alice })
        const reviewId = createdRes.data.created.id

        const input: ManagerFindManyReviewByProjectInput = {
          projectId,
          search: reviewId,
        }

        const res = await sdk.reviewerFindManyReviewByProject({ input }, { cookie: alice })

        expect(res.data.items.length).toBe(1)
        expect(res.data.items.find((item) => item.id === reviewId)).toBeTruthy()
      })

      it('should find a review by id', async () => {
        const createdRes = await sdk.reviewerCreateReview({ projectId }, { cookie: alice })
        const reviewId = createdRes.data.created.id

        const res = await sdk.reviewerFindOneReview({ reviewId }, { cookie: alice })

        expect(res.data.item.id).toBe(reviewId)
      })

      it('should delete a review', async () => {
        const createdRes = await sdk.reviewerCreateReview({ projectId }, { cookie: alice })
        const reviewId = createdRes.data.created.id

        const res = await sdk.reviewerDeleteReview({ reviewId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.reviewerFindManyReviewByProject(
          { input: { projectId, search: reviewId } },
          { cookie: alice },
        )
        expect(findRes.data.items.length).toBe(0)
      })
    })
  })
})
