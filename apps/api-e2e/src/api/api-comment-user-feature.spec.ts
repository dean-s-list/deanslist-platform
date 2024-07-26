import {
  Comment,
  ProjectStatus,
  ReviewerCreateCommentInput,
  ReviewerFindManyCommentInput,
  ReviewerUpdateCommentInput,
} from '@deanslist-platform/sdk'
import { getAliceCookie, sdk, uniqueId } from '../support'

describe('api-comment-feature', () => {
  describe('api-comment-user-resolver', () => {
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
      projectId = await sdk
        .managerCreateProject({ input: { communityId, name: uniqueId('project') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      await sdk.adminUpdateProject({ projectId, input: { status: ProjectStatus.Active } }, { cookie: alice })
      reviewId = await sdk.reviewerCreateReview({ projectId }, { cookie: alice }).then((res) => res.data.created.id)
      commentId = await sdk
        .reviewerCreateComment({ input: { reviewId, content: uniqueId('comment') } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should create a comment', async () => {
        const input: ReviewerCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }

        const res = await sdk.reviewerCreateComment({ input }, { cookie: alice })

        const item: Comment = res.data.created
        expect(item.content).toBe(input.content)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a comment', async () => {
        const createInput: ReviewerCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }
        const createdRes = await sdk.reviewerCreateComment({ input: createInput }, { cookie: alice })
        const commentId = createdRes.data.created.id
        const input: ReviewerUpdateCommentInput = {
          content: uniqueId('comment'),
        }

        const res = await sdk.reviewerUpdateComment({ commentId, input }, { cookie: alice })

        const item: Comment = res.data.updated
        expect(item.content).toBe(input.content)
      })

      it('should find a list of comments (find all)', async () => {
        const createInput: ReviewerCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }
        const createdRes = await sdk.reviewerCreateComment({ input: createInput }, { cookie: alice })
        const commentId = createdRes.data.created.id

        const input: ReviewerFindManyCommentInput = {
          reviewId,
        }

        const res = await sdk.reviewerFindManyComment({ input }, { cookie: alice })

        expect(res.data.items.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.items.find((item) => item.id === commentId)).toBeTruthy()
      })

      it('should find a list of comments (find new one)', async () => {
        const createInput: ReviewerCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }
        const createdRes = await sdk.reviewerCreateComment({ input: createInput }, { cookie: alice })
        const commentId = createdRes.data.created.id

        const input: ReviewerFindManyCommentInput = {
          search: commentId,
          reviewId,
        }

        const res = await sdk.reviewerFindManyComment({ input }, { cookie: alice })

        expect(res.data.items.length).toBe(1)
        expect(res.data.items[0].id).toBe(commentId)
      })

      it('should delete a comment', async () => {
        const createInput: ReviewerCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }
        const createdRes = await sdk.reviewerCreateComment({ input: createInput }, { cookie: alice })
        const commentId = createdRes.data.created.id

        const res = await sdk.reviewerDeleteComment({ commentId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.reviewerFindManyComment({ input: { search: commentId, reviewId } }, { cookie: alice })
        expect(findRes.data.items.length).toBe(0)
      })
    })
  })
})
