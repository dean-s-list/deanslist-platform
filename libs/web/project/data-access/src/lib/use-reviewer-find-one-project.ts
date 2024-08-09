import { sdk } from '@deanslist-platform/sdk'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useReviewerFindOneProject({ projectId }: { projectId: string }) {
  const client = useQueryClient()

  const queryKey = ['reviewer', 'find-one-project', projectId]

  const query = useQuery({
    queryKey,
    queryFn: () => sdk.reviewerFindOneProject({ projectId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    invalidate: () => client.invalidateQueries({ queryKey }),
  }
}
