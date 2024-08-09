import {
  OrderDirection,
  ProjectOrderBy,
  ProjectStatus,
  ReviewerFindManyProjectInput,
  sdk,
} from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useReviewerFindManyProject(props: Partial<ReviewerFindManyProjectInput> & { communityId?: string }) {
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [mineOnly, setMineOnly] = useState(props?.mineOnly ?? false)
  const [orderBy, setOrderBy] = useState<ProjectOrderBy>(ProjectOrderBy.EndDate)
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Asc)
  const [status, setStatus] = useState<ProjectStatus>(props?.status ?? ProjectStatus.Active)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ReviewerFindManyProjectInput = {
    page,
    limit,
    mineOnly,
    search,
    status,
    orderBy,
    orderDirection,
    communityId: props.communityId,
  }
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
    mineOnly,
    setMineOnly,
    orderBy,
    order: `${orderBy}-${orderDirection}`,
    setOrder: (input: string | null) => {
      if (!input) return
      const [orderBy, orderDirection] = input.split('-') as [ProjectOrderBy, OrderDirection]
      setOrderBy(orderBy)
      setOrderDirection(orderDirection)
    },
    setOrderBy,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    search,
    setSearch,
  }
}
