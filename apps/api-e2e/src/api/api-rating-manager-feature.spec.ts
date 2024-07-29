import { Comment, ManagerCreateRatingInput, ManagerUpdateRatingInput, Project, Rating } from '@deanslist-platform/sdk'
import {
  adminUpdateProject,
  adminUpdateProjectStatusClosed,
  alice,
  getAliceCookie,
  getBobCookie,
  managerCreateActiveProject,
  managerCreateCommunity,
  reviewerCreateComment,
  reviewerCreateReview,
  sdk,
  uniqueId,
} from '../support'

describe('api-rating-feature', () => {
  describe('api-rating-manager-resolver', () => {
    const ratingName = uniqueId('acme-rating')
    const cookies: Record<string, { cookie: string }> = {}
    let ratingId: string
    let communityId: string
    let project: Project | undefined
    let projectId: string
    let reviewAliceId: string

    beforeAll(async () => {
      cookies.alice = await getAliceCookie().then((cookie) => ({ cookie }))
      cookies.bob = await getBobCookie().then((cookie) => ({ cookie }))
      communityId = await managerCreateCommunity({ ...cookies.alice }).then((community) => community.id)
    })

    beforeEach(async () => {
      // Create an active project
      project = await managerCreateActiveProject({ ...cookies.alice, communityId })
      projectId = project.id

      // Create the reviews for Alice
      reviewAliceId = await reviewerCreateReview({ projectId, ...cookies.alice }).then((review) => review.id)
    })

    describe('authorized', () => {
      it('should create a rating', async () => {
        const commentId = await reviewerCreateComment({
          ...cookies.alice,
          reviewId: reviewAliceId,
          content: uniqueId('comment'),
        }).then((comment) => comment.id)
        const input: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }

        await adminUpdateProjectStatusClosed({ ...cookies.alice, projectId })
        const res = await sdk.managerCreateRating({ input }, cookies.alice)

        const item: Rating = res.data.created
        expect(item.content).toBe(input.content)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a rating', async () => {
        const commentId = await reviewerCreateComment({
          ...cookies.alice,
          reviewId: reviewAliceId,
          content: uniqueId('comment'),
        }).then((comment) => comment.id)
        await adminUpdateProjectStatusClosed({ ...cookies.alice, projectId })
        const createInput: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.managerCreateRating({ input: createInput }, cookies.alice)
        const ratingId = createdRes.data.created.id
        const input: ManagerUpdateRatingInput = {
          content: uniqueId('rating'),
        }

        const res = await sdk.managerUpdateRating({ ratingId, input }, cookies.alice)

        const item: Rating = res.data.updated
        expect(item.content).toBe(input.content)
      })

      it('should find a list of ratings (find all)', async () => {
        const commentId = await reviewerCreateComment({
          ...cookies.alice,
          reviewId: reviewAliceId,
          content: uniqueId('comment'),
        }).then((comment) => comment.id)
        const createInput: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        await adminUpdateProjectStatusClosed({ ...cookies.alice, projectId })
        const createdRes = await sdk.managerCreateRating({ input: createInput }, cookies.alice)
        const ratingId = createdRes.data.created.id

        const res = await sdk.managerFindManyComment({ input: { projectId } }, cookies.alice)

        expect(res.data.items.length).toBeGreaterThanOrEqual(1)
        // First item should be the one we created above
        expect(res.data.items.flatMap((i) => i.ratings).find((item) => item.id === ratingId)).toBeTruthy()
      })

      it('should find a list of ratings (find new one)', async () => {
        const commentId = await reviewerCreateComment({
          ...cookies.alice,
          reviewId: reviewAliceId,
          content: uniqueId('comment'),
        }).then((comment) => comment.id)
        await adminUpdateProjectStatusClosed({ ...cookies.alice, projectId })

        const createInput: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.managerCreateRating({ input: createInput }, cookies.alice)
        const ratingId = createdRes.data.created.id

        const findRes = await sdk.managerFindManyComment({ input: { projectId, search: ratingId } }, cookies.alice)

        expect(findRes.data.items.length).toBe(1)
        expect(findRes.data.items.flatMap((i) => i.ratings).find((item) => item.id === ratingId)).toBeTruthy()
      })

      it('should delete a rating', async () => {
        const commentId = await reviewerCreateComment({
          ...cookies.alice,
          reviewId: reviewAliceId,
          content: uniqueId('comment'),
        }).then((comment) => comment.id)
        await adminUpdateProjectStatusClosed({ ...cookies.alice, projectId })

        const createInput: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.managerCreateRating({ input: createInput }, cookies.alice)
        const ratingId = createdRes.data.created.id

        const res = await sdk.managerDeleteRating({ ratingId }, cookies.alice)

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.managerFindManyComment({ input: { projectId } }, cookies.alice)

        expect(findRes.data.items.flatMap((i) => i.ratings).length).toBe(0)
      })

      describe('rating e2e', () => {
        const comments: Comment[] = []
        let e2eProjectId: string
        let reviewAliceId: string
        let reviewBobId: string

        // TODO: Add e2e tests for ratings
        beforeAll(async () => {
          // Create an active project
          e2eProjectId = await managerCreateActiveProject({ ...cookies.alice, communityId }).then(
            (project) => project.id,
          )

          // Create the reviews for Alice and Bob
          reviewAliceId = await reviewerCreateReview({ projectId: e2eProjectId, ...cookies.alice }).then(
            (review) => review.id,
          )
          reviewBobId = await reviewerCreateReview({ projectId: e2eProjectId, ...cookies.bob }).then(
            (review) => review.id,
          )

          // Create some comments
          for (const content of ['comment-alice-1', 'comment-alice-2']) {
            comments.push(await reviewerCreateComment({ ...cookies.alice, reviewId: reviewAliceId, content }))
          }
          for (const content of ['comment-bob-1', 'comment-bob-2']) {
            comments.push(await reviewerCreateComment({ ...cookies.bob, reviewId: reviewBobId, content }))
          }
          await adminUpdateProject({
            ...cookies.alice,
            projectId: e2eProjectId,
            amountTotalUsd: 1000,
            amountManagerUsd: 200,
            amountReferralUsd: 50,
          })
          await adminUpdateProjectStatusClosed({ ...cookies.alice, projectId: e2eProjectId })

          for (const comment of comments) {
            const rating = comment.authorId === alice.username ? 5 : 1
            const content = uniqueId('my-rating')
            await sdk.managerCreateRating({ input: { commentId: comment.id, content, rating } }, cookies.alice)
          }
        })

        it('should create comments and ratings', async () => {
          // ARRANGE

          // ACT
          const ratedComments = await sdk
            .managerFindManyComment({ input: { projectId: e2eProjectId } }, cookies.alice)
            .then((res) => res.data.items)
          const ratedReviews = await sdk
            .managerFindManyReviewByProject({ input: { projectId: e2eProjectId } }, cookies.alice)
            .then((res) => res.data.items)

          // ASSERT
          expect(ratedComments.length).toBe(comments.length)
          expect(ratedReviews.length).toBe(2)

          // alice should have a ratingAverage of 5
          const ratedReviewAlice = ratedReviews.find((review) => review.id === reviewAliceId)
          expect(ratedReviewAlice?.ratingAverage).toBe(5)
          expect(ratedReviewAlice?.ratingProgress).toBe(100)

          // bob should have a ratingAverage of 1
          const ratedReviewBob = ratedReviews.find((review) => review.id === reviewBobId)
          expect(ratedReviewBob?.ratingAverage).toBe(1)
          expect(ratedReviewBob?.ratingProgress).toBe(100)
        })

        it('should split by rating', async () => {
          // ACT
          await sdk.managerSplitByRating({ projectId: e2eProjectId }, cookies.alice)
          const ratedReviews = await sdk
            .managerFindManyReviewByProject({ input: { projectId: e2eProjectId } }, cookies.alice)
            .then((res) => res.data.items)

          // ASSERT
          expect(ratedReviews.length).toBe(2)

          // alice should have an amount of 625
          const ratedReviewAlice = ratedReviews.find((review) => review.id === reviewAliceId)
          expect(ratedReviewAlice?.amount).toBe(625)
          expect(ratedReviewAlice?.bonus).toBe(0)

          // bob should have an amount of 125
          const ratedReviewBob = ratedReviews.find((review) => review.id === reviewBobId)
          expect(ratedReviewBob?.amount).toBe(125)
          expect(ratedReviewBob?.bonus).toBe(0)
        })
      })
    })

    describe('unauthorized', () => {
      let commentId: string
      beforeAll(async () => {
        commentId = await reviewerCreateComment({
          ...cookies.alice,
          reviewId: reviewAliceId,
          content: uniqueId('comment'),
        }).then((comment) => comment.id)
        await adminUpdateProjectStatusClosed({ ...cookies.alice, projectId })
        ratingId = await sdk
          .managerCreateRating({ input: { commentId, content: ratingName, rating: 1 } }, cookies.alice)
          .then((res) => res.data.created.id)
      })

      it('should not create a rating', async () => {
        expect.assertions(1)
        const input: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }

        try {
          await sdk.managerCreateRating({ input }, cookies.bob)
        } catch (e) {
          expect(e.message).toBe('You are not a manager of this project')
        }
      })

      it('should not update a rating', async () => {
        expect.assertions(1)
        try {
          await sdk.managerUpdateRating({ ratingId, input: {} }, cookies.bob)
        } catch (e) {
          expect(e.message).toBe('Unauthorized')
        }
      })

      it('should not delete a rating', async () => {
        expect.assertions(1)
        try {
          await sdk.managerDeleteRating({ ratingId }, cookies.bob)
        } catch (e) {
          expect(e.message).toBe('Unauthorized')
        }
      })
    })
  })
})
