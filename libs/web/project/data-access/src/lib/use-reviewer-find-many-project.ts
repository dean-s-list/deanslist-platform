import { ProjectStatus, ReviewerFindManyProjectInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useReviewerFindManyProject(props: Partial<ReviewerFindManyProjectInput> & { teamId?: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [status, setStatus] = useState<ProjectStatus>(props?.status ?? ProjectStatus.Active)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ReviewerFindManyProjectInput = { page, limit, search, status, teamId: props.teamId }
  const query = useQuery({
    queryKey: ['reviewer', 'find-many-project', input],
    queryFn: () => sdk.reviewerFindManyProject({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    status,
    setStatus,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
  }
}
