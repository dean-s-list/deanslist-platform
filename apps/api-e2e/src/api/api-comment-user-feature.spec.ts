import {
  Comment,
  ReviewerCreateCommentInput,
  ReviewerFindManyCommentInput,
  ReviewerUpdateCommentInput,
} from '@deanslist-platform/sdk'
import {
  getAliceCookie,
  managerCreateActiveProject,
  managerCreateCommunity,
  reviewerCreateComment,
  reviewerCreateReview,
  sdk,
  uniqueId,
} from '../support'

describe('api-comment-feature', () => {
  describe('api-comment-user-resolver', () => {
    const cookies: Record<string, { cookie: string }> = {}
    let communityId: string
    let projectId: string
    let reviewId: string
    let commentId: string

    beforeAll(async () => {
      cookies.alice = await getAliceCookie().then((cookie) => ({ cookie }))
      communityId = await managerCreateCommunity({ ...cookies.alice }).then((community) => community.id)
      projectId = await managerCreateActiveProject({ ...cookies.alice, communityId }).then((project) => project.id)
      reviewId = await reviewerCreateReview({ ...cookies.alice, projectId }).then((review) => review.id)
      commentId = await reviewerCreateComment({ ...cookies.alice, reviewId, content: uniqueId('comment') }).then(
        (comment) => comment.id,
      )
    })

    describe('authorized', () => {
      it('should create a comment', async () => {
        const input: ReviewerCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }

        const item: Comment = await sdk.reviewerCreateComment({ input }, cookies.alice).then((res) => res.data.created)

        expect(item.content).toBe(input.content)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a comment', async () => {
        const input: ReviewerUpdateCommentInput = {
          content: uniqueId('comment'),
        }

        const item: Comment = await sdk
          .reviewerUpdateComment({ commentId, input }, cookies.alice)
          .then((res) => res.data.updated)

        expect(item.content).toBe(input.content)
      })

      it('should find a list of comments (find all)', async () => {
        const input: ReviewerFindManyCommentInput = {
          reviewId,
        }

        const items: Comment[] = await sdk
          .reviewerFindManyComment({ input }, cookies.alice)
          .then((res) => res.data.items)

        expect(items.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(items.find((item) => item.id === commentId)).toBeTruthy()
      })

      it('should find a list of comments (find new one)', async () => {
        const input: ReviewerFindManyCommentInput = {
          search: commentId,
          reviewId,
        }

        const items: Comment[] = await sdk
          .reviewerFindManyComment({ input }, cookies.alice)
          .then((res) => res.data.items)

        expect(items.length).toBe(1)
        expect(items[0].id).toBe(commentId)
      })

      it('should delete a comment', async () => {
        const deleted: boolean = await sdk
          .reviewerDeleteComment({ commentId }, cookies.alice)
          .then((res) => res.data.deleted)

        const items = await sdk
          .reviewerFindManyComment({ input: { search: commentId, reviewId } }, cookies.alice)
          .then((res) => res.data.items)

        expect(deleted).toBe(true)
        expect(items.length).toBe(0)
      })
    })
  })
})
