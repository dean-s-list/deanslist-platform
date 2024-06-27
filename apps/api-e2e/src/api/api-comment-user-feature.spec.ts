import {
  Comment,
  UserCreateCommentInput,
  UserFindManyCommentInput,
  UserUpdateCommentInput,
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
        .userCreateCommunity({ input: { name: uniqueId('community') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      projectId = await sdk
        .userCreateProject({ input: { communityId, name: uniqueId('project') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      reviewId = await sdk.userCreateReview({ projectId }, { cookie: alice }).then((res) => res.data.created.id)
      commentId = await sdk
        .userCreateComment({ input: { reviewId, content: uniqueId('comment') } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should create a comment', async () => {
        const input: UserCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }

        const res = await sdk.userCreateComment({ input }, { cookie: alice })

        const item: Comment = res.data.created
        expect(item.content).toBe(input.content)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a comment', async () => {
        const createInput: UserCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }
        const createdRes = await sdk.userCreateComment({ input: createInput }, { cookie: alice })
        const commentId = createdRes.data.created.id
        const input: UserUpdateCommentInput = {
          content: uniqueId('comment'),
        }

        const res = await sdk.userUpdateComment({ commentId, input }, { cookie: alice })

        const item: Comment = res.data.updated
        expect(item.content).toBe(input.content)
      })

      it('should find a list of comments (find all)', async () => {
        const createInput: UserCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }
        const createdRes = await sdk.userCreateComment({ input: createInput }, { cookie: alice })
        const commentId = createdRes.data.created.id

        const input: UserFindManyCommentInput = {
          reviewId,
        }

        const res = await sdk.userFindManyComment({ input }, { cookie: alice })

        expect(res.data.items.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.items.find((item) => item.id === commentId)).toBeTruthy()
      })

      it('should find a list of comments (find new one)', async () => {
        const createInput: UserCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }
        const createdRes = await sdk.userCreateComment({ input: createInput }, { cookie: alice })
        const commentId = createdRes.data.created.id

        const input: UserFindManyCommentInput = {
          search: commentId,
          reviewId,
        }

        const res = await sdk.userFindManyComment({ input }, { cookie: alice })

        expect(res.data.items.length).toBe(1)
        expect(res.data.items[0].id).toBe(commentId)
      })

      it('should delete a comment', async () => {
        const createInput: UserCreateCommentInput = {
          content: uniqueId('comment'),
          reviewId,
        }
        const createdRes = await sdk.userCreateComment({ input: createInput }, { cookie: alice })
        const commentId = createdRes.data.created.id

        const res = await sdk.userDeleteComment({ commentId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyComment({ input: { search: commentId, reviewId } }, { cookie: alice })
        expect(findRes.data.items.length).toBe(0)
      })
    })
  })
})
