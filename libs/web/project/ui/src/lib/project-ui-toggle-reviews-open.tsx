import { ManagerUpdateProjectInput, Project } from '@deanslist-platform/sdk'
import { Switch } from '@mantine/core'
import { toastInfo } from '@pubkey-ui/core'

export function ProjectUiToggleReviewsOpen({
  project,
  update,
}: {
  project: Project
  update: (input: ManagerUpdateProjectInput) => Promise<boolean>
}) {
  return (
    <Switch
      label="Open Reviews"
      description="Open Reviews allows any user to create a review for this project."
      checked={project?.reviewsOpen ?? false}
      onChange={(e) =>
        update({ reviewsOpen: e.target.checked }).then(() => {
          toastInfo(`Open reviews ${e.target.checked ? 'disabled' : 'enabled'}`)
        })
      }
    />
  )
}
