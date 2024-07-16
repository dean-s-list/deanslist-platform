import { ManagerCreateProjectInput } from '@deanslist-platform/sdk'
import { useManagerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ManagerProjectUiCreateForm } from '@deanslist-platform/web-project-ui'
import { toastError } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function ManagerProjectCreateFeature({
  communityId,
  afterSubmit,
}: {
  communityId: string
  afterSubmit: () => void
}) {
  const navigate = useNavigate()
  const { createProject } = useManagerFindManyProject({ communityId })

  async function submit(input: ManagerCreateProjectInput) {
    return createProject(input)
      .then((res) => {
        if (res) {
          afterSubmit()
          navigate(res.manageUrl)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return <ManagerProjectUiCreateForm submit={submit} />
}
