import {
  adminUpdateProjectStatusClosed,
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
  describe('api-rating-admin-resolver', () => {
    let ratingId: string
    let communityId: string
    let projectId: string
    let reviewId: string
    let commentId: string

    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      communityId = await managerCreateCommunity({ cookie: alice }).then((community) => community.id)
      projectId = await managerCreateActiveProject({ cookie: alice, communityId }).then((project) => project.id)
      reviewId = await reviewerCreateReview({ cookie: alice, projectId }).then((review) => review.id)
      commentId = await reviewerCreateComment({ cookie: alice, reviewId, content: uniqueId('comment') }).then(
        (comment) => comment.id,
      )
      await adminUpdateProjectStatusClosed({ cookie: alice, projectId })
      ratingId = await sdk
        .managerCreateRating({ input: { commentId, content: uniqueId('rating'), rating: 1 } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should delete a rating', async () => {
        const res = await sdk.adminDeleteRating({ ratingId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyRating({ input: { search: ratingId } }, { cookie: alice })
        expect(findRes.data.items.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not update a rating', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateRating(
            {
              ratingId,
              input: {
                rating: 1,
                content: uniqueId('rating'),
              },
            },
            { cookie: bob },
          )
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of ratings (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyRating({ input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a rating', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteRating({ ratingId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
