import { ManagerFindManyCommentInput, sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useManagerFindManyComment(props: Partial<ManagerFindManyCommentInput> & { projectId: string }) {
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ManagerFindManyCommentInput = { search, projectId: props.projectId }
  const query = useQuery({
    queryKey: ['manager', 'find-many-comment', input],
    queryFn: () => sdk.managerFindManyComment({ input }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
  }
}
