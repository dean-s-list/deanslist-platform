import { AdminFindManyCommentInput, AdminUpdateCommentInput, Comment } from '@deanslist-platform/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-comment-feature', () => {
  describe('api-comment-admin-resolver', () => {
    let teamId: string
    let projectId: string
    let reviewId: string
    let commentId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      teamId = await sdk
        .userCreateTeam({ input: { name: uniqueId('team') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      projectId = await sdk
        .userCreateProject({ input: { teamId, name: uniqueId('project') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      reviewId = await sdk.userCreateReview({ projectId }, { cookie: alice }).then((res) => res.data.created.id)
      commentId = await sdk
        .userCreateComment({ input: { reviewId, content: uniqueId('comment') } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should update a comment', async () => {
        const input: AdminUpdateCommentInput = {
          content: uniqueId('comment'),
        }

        const res = await sdk.adminUpdateComment({ commentId, input }, { cookie: alice })

        const item: Comment = res.data.updated
        expect(item.content).toBe(input.content)
      })

      it('should find a list of comments (find all)', async () => {
        const input: AdminFindManyCommentInput = {
          reviewId,
        }

        const res = await sdk.adminFindManyComment({ input }, { cookie: alice })

        expect(res.data.items.length).toBeGreaterThanOrEqual(1)
        // First item should be the one we created above
        expect(res.data.items.map((i) => i.id).includes(commentId)).toBeTruthy()
      })

      it('should find a list of comments (find new one)', async () => {
        const input: AdminFindManyCommentInput = {
          search: commentId,
          reviewId,
        }

        const res = await sdk.adminFindManyComment({ input }, { cookie: alice })

        expect(res.data.items.length).toBe(1)
        expect(res.data.items[0].id).toBe(commentId)
      })

      it('should delete a comment', async () => {
        const res = await sdk.adminDeleteComment({ commentId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyComment(
          {
            input: {
              reviewId,
              search: commentId,
            },
          },
          { cookie: alice },
        )
        expect(findRes.data.items.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not update a comment', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateComment({ commentId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of comments (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyComment({ input: { reviewId } }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a comment', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteComment({ commentId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
