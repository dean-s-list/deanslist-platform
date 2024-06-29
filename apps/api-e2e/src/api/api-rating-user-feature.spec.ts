import { ManagerCreateRatingInput, ManagerUpdateRatingInput, ProjectStatus, Rating } from '@deanslist-platform/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-rating-feature', () => {
  describe('api-rating-user-resolver', () => {
    const ratingName = uniqueId('acme-rating')
    let ratingId: string
    let communityId: string
    let projectId: string
    let reviewId: string
    let commentId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      communityId = await sdk
        .managerCreateCommunity({ input: { name: uniqueId('community') } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })
    beforeEach(async () => {
      projectId = await sdk
        .managerCreateProject({ input: { communityId, name: uniqueId('project') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      await sdk.managerUpdateProject({ projectId, input: { status: ProjectStatus.Active } }, { cookie: alice })
      reviewId = await sdk.reviewerCreateReview({ projectId }, { cookie: alice }).then((res) => res.data.created.id)
      commentId = await sdk
        .reviewerCreateComment({ input: { reviewId, content: uniqueId('comment') } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should create a rating', async () => {
        const input: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }

        const res = await sdk.managerCreateRating({ input }, { cookie: alice })

        const item: Rating = res.data.created
        expect(item.content).toBe(input.content)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a rating', async () => {
        const createInput: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.managerCreateRating({ input: createInput }, { cookie: alice })
        const ratingId = createdRes.data.created.id
        const input: ManagerUpdateRatingInput = {
          content: uniqueId('rating'),
        }

        const res = await sdk.managerUpdateRating({ ratingId, input }, { cookie: alice })

        const item: Rating = res.data.updated
        expect(item.content).toBe(input.content)
      })

      it('should find a list of ratings (find all)', async () => {
        const createInput: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.managerCreateRating({ input: createInput }, { cookie: alice })
        const ratingId = createdRes.data.created.id

        const res = await sdk.managerFindManyComment({ input: { projectId } }, { cookie: alice })

        expect(res.data.items.length).toBeGreaterThanOrEqual(1)
        // First item should be the one we created above
        expect(res.data.items.flatMap((i) => i.ratings).find((item) => item.id === ratingId)).toBeTruthy()
      })

      it('should find a list of ratings (find new one)', async () => {
        const createInput: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.managerCreateRating({ input: createInput }, { cookie: alice })
        const ratingId = createdRes.data.created.id

        const findRes = await sdk.managerFindManyComment({ input: { projectId, search: ratingId } }, { cookie: alice })

        expect(findRes.data.items.length).toBe(1)
        expect(findRes.data.items.flatMap((i) => i.ratings).find((item) => item.id === ratingId)).toBeTruthy()
      })

      it('should delete a rating', async () => {
        const createInput: ManagerCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.managerCreateRating({ input: createInput }, { cookie: alice })
        const ratingId = createdRes.data.created.id

        const res = await sdk.managerDeleteRating({ ratingId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.managerFindManyComment({ input: { projectId } }, { cookie: alice })

        expect(findRes.data.items.flatMap((i) => i.ratings).length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
        ratingId = await sdk
          .managerCreateRating({ input: { commentId, content: ratingName, rating: 1 } }, { cookie: alice })
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
          await sdk.managerCreateRating({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not a manager of this project')
        }
      })

      it('should not update a rating', async () => {
        expect.assertions(1)
        try {
          await sdk.managerUpdateRating({ ratingId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized')
        }
      })

      it('should not delete a rating', async () => {
        expect.assertions(1)
        try {
          await sdk.managerDeleteRating({ ratingId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized')
        }
      })
    })
  })
})
