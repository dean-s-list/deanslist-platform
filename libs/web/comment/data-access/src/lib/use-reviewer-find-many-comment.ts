import { ReviewerCreateCommentInput, ReviewerFindManyCommentInput } from '@deanslist-platform/sdk'
import { useBrowserVersion, useSdk } from '@deanslist-platform/web-core-data-access'
import { useReviewerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export function useReviewerFindManyComment(props: Partial<ReviewerFindManyCommentInput> & { reviewId: string }) {
  const sdk = useSdk()
  const { browser: versionBrowser, os: versionOs } = useBrowserVersion()
  const { projectId } = useParams<{ projectId: string }>() as { projectId: string }
  const { invalidate: invalidateProjectParticipants } = useReviewerFindOneProject({ projectId })
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ReviewerFindManyCommentInput = { search, reviewId: props.reviewId }
  const query = useQuery({
    queryKey: ['reviewer', 'find-many-comment', input],
    queryFn: () => sdk.reviewerFindManyComment({ input }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
    createComment: (input: ReviewerCreateCommentInput) =>
      sdk
        .reviewerCreateComment({
          input: {
            ...input,
            versionBrowser: `${versionBrowser ?? 'Unknown'}`,
            versionOs: `${versionOs ?? 'Unknown'}`,
            reviewId: props.reviewId,
          },
        })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.created) {
            toastSuccess(`Your comment was added`)
            await invalidateProjectParticipants()
          } else {
            toastError(`Your comment was not added`)
          }
          await query.refetch()
          return !!res.created
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    deleteComment: (commentId: string) =>
      sdk.reviewerDeleteComment({ commentId }).then(async () => {
        toastSuccess('Comment deleted')
        await query.refetch()
        await invalidateProjectParticipants()
        return true
      }),
  }
}
