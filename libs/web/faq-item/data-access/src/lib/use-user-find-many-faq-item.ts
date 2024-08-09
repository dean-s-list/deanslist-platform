import { FaqItemGroup, FaqItemUserFindManyInput, sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyFaqItem(props: Partial<FaqItemUserFindManyInput> = {}) {
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: FaqItemUserFindManyInput = { search }
  const query = useQuery({
    queryKey: ['user', 'find-many-faq-item', input],
    queryFn: () => sdk.userFindManyFaqItem({ input }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    grouped: [FaqItemGroup.Reviewer, FaqItemGroup.Manager].map((group) => ({
      group,
      items: items.filter((item) => item.group === group),
    })),
    query,
    setSearch,
  }
}
