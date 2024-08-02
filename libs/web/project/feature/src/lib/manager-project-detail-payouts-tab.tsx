import { useManagerFindOneProject, useManagerUpdateProjectMember } from '@deanslist-platform/web-project-data-access'
import { ManagerProjectUiPayoutsForm } from '@deanslist-platform/web-project-ui'
import { UiError, UiLoader } from '@pubkey-ui/core'

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
  )
}
