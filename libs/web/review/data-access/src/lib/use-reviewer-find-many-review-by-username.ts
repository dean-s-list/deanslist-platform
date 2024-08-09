import { Review, ReviewerFindManyReviewByUsernameInput, sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useReviewerFindManyReviewByUsername(
  props: Partial<ReviewerFindManyReviewByUsernameInput> & { username: string },
) {
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ReviewerFindManyReviewByUsernameInput = { search, username: props.username }
  const query = useQuery({
    queryKey: ['reviewer', 'find-many-review-by-username', input],
    queryFn: () => sdk.reviewerFindManyReviewByUsername({ input }).then((res) => res.data),
  })
  const items: Review[] = query.data?.items ?? []

  return {
    items,
    query,
    search,
    setSearch,
  }
}
