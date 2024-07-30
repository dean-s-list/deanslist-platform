import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { UiError, UiLoader } from '@pubkey-ui/core'
import { ProjectUiTeamManager } from './project-ui-team-manager'

export function ManagerProjectDetailTeamTab({ projectId }: { projectId: string }) {
  const {
    item,
    query,
    addProjectManager,
    addProjectReferral,
    addProjectReviewer,
    removeProjectManager,
    removeProjectReferral,
    removeProjectReviewer,
    updateProject,
  } = useManagerFindOneProject({ projectId })

  if (query.isLoading || query.isFetching) {
    return <UiLoader />
  }

  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <ProjectUiTeamManager
      project={item}
      addProjectManager={addProjectManager}
      addProjectReferral={addProjectReferral}
      addProjectReviewer={addProjectReviewer}
      removeProjectManager={removeProjectManager}
      removeProjectReferral={removeProjectReferral}
      removeProjectReviewer={removeProjectReviewer}
      updateProject={(input) => updateProject(input, false)}
    />
  )
}
