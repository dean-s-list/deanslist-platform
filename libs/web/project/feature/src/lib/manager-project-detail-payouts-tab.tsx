import { useManagerFindOneProject, useManagerUpdateProjectMember } from '@deanslist-platform/web-project-data-access'
import { ManagerProjectUiPayoutsForm } from '@deanslist-platform/web-project-ui'
import { UiError, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function ManagerProjectDetailPayoutsTab({ projectId }: { projectId: string }) {
  const { item, query, invalidate, splitByRating } = useManagerFindOneProject({ projectId })
  const update = useManagerUpdateProjectMember()

  if (query.isLoading || query.isFetching) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <UiStack>
      <UiInfo
        message="After a session has concluded and the managers have rated all the provided feedback, they can see the total payout pool available for the given session and allocate earnings respectively based on user performance (by manually typing the amount in each user's earnings field. Alternatively, they can click on the ‘Split by Payment’ button which automatically splits the total payout pool to the participating users based on their average star score."
        variant="outline"
      />

      <ManagerProjectUiPayoutsForm
        project={item}
        splitByRating={async () => {
          return splitByRating().then(async (res) => {
            await query.refetch()
            return res
          })
        }}
        update={(reviewId, input) =>
          update(reviewId, input).then(async (res) => {
            await invalidate()
            return res
          })
        }
        members={item.members ?? []}
      />
    </UiStack>
  )
}
