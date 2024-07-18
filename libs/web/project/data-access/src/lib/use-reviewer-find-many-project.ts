import { ProjectStatus, ReviewerFindManyProjectInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ProjectOrderBy } from '@deanslist-platform/api-project-data-access'

export const orderByOptions: ProjectOrderBy[] = [
  {
    label: 'End date',
    value: 'endDate-desc',
    field: 'endDate',
    sort: 'desc',
  },
  {
    label: 'End date',
    value: 'endDate-asc',
    field: 'endDate',
    sort: 'asc',
  },
  {
    label: 'Value',
    value: 'amountTotalUsd-desc',
    field: 'amountTotalUsd',
    sort: 'desc',
  },
  {
    label: 'Value',
    value: 'amountTotalUsd-asc',
    field: 'amountTotalUsd',
    sort: 'asc',
  },
]

export function useReviewerFindManyProject(props: Partial<ReviewerFindManyProjectInput> & { communityId?: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [orderBy, setOrderBy] = useState<ProjectOrderBy>(orderByOptions[0])
  const [status, setStatus] = useState<ProjectStatus>(props?.status ?? ProjectStatus.Active)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ReviewerFindManyProjectInput = { page, limit, search, status, orderBy, communityId: props.communityId }
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
    orderBy,
    setOrderBy,
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
