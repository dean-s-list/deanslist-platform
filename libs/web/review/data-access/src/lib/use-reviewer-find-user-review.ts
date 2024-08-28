import { sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useReviewerFindUserProjectReview({ projectId }: { projectId: string }) {
  const query = useQuery({
    queryKey: ['reviewer', 'find-reviewer-review', projectId],
    queryFn: () => sdk.reviewerFindUserProjectReview({ projectId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
