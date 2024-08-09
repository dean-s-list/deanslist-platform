import { FaqItemAdminUpdateInput, sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneFaqItem({ faqItemId }: { faqItemId: string }) {
  const query = useQuery({
    queryKey: ['admin', 'find-one-faq-item', faqItemId],
    queryFn: () => sdk.adminFindOneFaqItem({ faqItemId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateFaqItem: async (faqItemId: string, input: FaqItemAdminUpdateInput) =>
      sdk
        .adminUpdateFaqItem({ faqItemId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('FaqItem updated')
            await query.refetch()
            return true
          }
          toastError('FaqItem not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
