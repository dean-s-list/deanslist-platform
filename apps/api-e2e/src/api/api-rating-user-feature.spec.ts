import { Rating, UserCreateRatingInput, UserFindManyRatingInput, UserUpdateRatingInput } from '@deanslist-platform/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

xdescribe('api-rating-feature', () => {
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
        .userCreateCommunity({ input: { name: uniqueId('community') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      projectId = await sdk
        .userCreateProject({ input: { communityId, name: uniqueId('project') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      reviewId = await sdk.userCreateReview({ projectId }, { cookie: alice }).then((res) => res.data.created.id)
      commentId = await sdk
        .userCreateComment({ input: { reviewId, content: uniqueId('comment') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      ratingId = await sdk
        .userCreateRating({ input: { commentId, content: ratingName, rating: 1 } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should create a rating', async () => {
        const input: UserCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }

        const res = await sdk.userCreateRating({ input }, { cookie: alice })

        const item: Rating = res.data.created
        expect(item.content).toBe(input.content)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a rating', async () => {
        const createInput: UserCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.userCreateRating({ input: createInput }, { cookie: alice })
        const ratingId = createdRes.data.created.id
        const input: UserUpdateRatingInput = {
          content: uniqueId('rating'),
        }

        const res = await sdk.userUpdateRating({ ratingId, input }, { cookie: alice })

        const item: Rating = res.data.updated
        expect(item.content).toBe(input.content)
      })

      it('should find a list of ratings (find all)', async () => {
        const createInput: UserCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.userCreateRating({ input: createInput }, { cookie: alice })
        const ratingId = createdRes.data.created.id

        const input: UserFindManyRatingInput = {}

        const res = await sdk.userFindManyRating({ input }, { cookie: alice })

        expect(res.data.items.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.items.find((item) => item.id === ratingId)).toBeTruthy()
      })

      it('should find a list of ratings (find new one)', async () => {
        const createInput: UserCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.userCreateRating({ input: createInput }, { cookie: alice })
        const ratingId = createdRes.data.created.id

        const input: UserFindManyRatingInput = {
          search: ratingId,
        }

        const res = await sdk.userFindManyRating({ input }, { cookie: alice })

        expect(res.data.items.length).toBe(1)
        expect(res.data.items.find((item) => item.id === ratingId)).toBeTruthy()
      })

      it('should delete a rating', async () => {
        const createInput: UserCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }
        const createdRes = await sdk.userCreateRating({ input: createInput }, { cookie: alice })
        const ratingId = createdRes.data.created.id

        const res = await sdk.userDeleteRating({ ratingId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyRating({ input: { search: ratingId } }, { cookie: alice })

        expect(findRes.data.items.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not create a rating', async () => {
        expect.assertions(1)
        const input: UserCreateRatingInput = {
          commentId,
          rating: 1,
          content: uniqueId('rating'),
        }

        try {
          await sdk.userCreateRating({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized')
        }
      })

      it('should not update a rating', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateRating({ ratingId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized')
        }
      })

      it('should not find a list of ratings (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindManyRating({ input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized')
        }
      })

      it('should not delete a rating', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteRating({ ratingId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized')
        }
      })
    })
  })
})
