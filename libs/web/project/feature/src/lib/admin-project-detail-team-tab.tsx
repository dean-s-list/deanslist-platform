import { useAdminFindOneProject } from '@deanslist-platform/web-project-data-access'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'
import { ProjectUiTeamManager } from './manager-project-detail-team-tab'

export function AdminProjectDetailTeamTab({ projectId }: { projectId: string }) {
  const {
    item,
    query,
    addProjectManager,
    addProjectReviewer,
    addProjectReferral,
    removeProjectManager,
    removeProjectReviewer,
    removeProjectReferral,
    updateProject,
  } = useAdminFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <UiCard>
      <ProjectUiTeamManager
        project={item}
        addProjectManager={addProjectManager}
        addProjectReferral={addProjectReferral}
        addProjectReviewer={addProjectReviewer}
        removeProjectManager={removeProjectManager}
        removeProjectReferral={removeProjectReferral}
        removeProjectReviewer={removeProjectReviewer}
        updateProject={(input) => updateProject(input, false).then(() => true)}
      />
    </UiCard>
  )
}
