import { FaqItemUserFindManyInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyFaqItem(props: Partial<FaqItemUserFindManyInput> = {}) {
  const sdk = useSdk()
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: FaqItemUserFindManyInput = { search }
  const query = useQuery({
    queryKey: ['user', 'find-many-faq-item', input],
    queryFn: () => sdk.userFindManyFaqItem({ input }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
  }
}
