import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiButton } from '@deanslist-platform/web-core-ui'
import { ManagerTeamFeature } from '@deanslist-platform/web-team-feature'
import { modals } from '@mantine/modals'
import { UiCard, UiGroup, UiPage, UiStack } from '@pubkey-ui/core'
import { IconPlus, IconUsersGroup } from '@tabler/icons-react'
import { Navigate, useRoutes } from 'react-router-dom'

export default function () {
  const { isManager } = useAuth()

  if (!isManager) {
    return <Navigate to="/dashboard" replace />
  }

  return useRoutes([
    { path: '', element: <Navigate to="projects" replace /> },
    { path: '/projects/*', element: <ManagementProjectsFeature /> },
    { path: '/teams/*', element: <ManagerTeamFeature /> },
  ])
}

export function ManagementProjectsFeature() {
  const { isManager } = useAuth()

  if (!isManager) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <UiPage
      title="Projects"
      rightAction={
        <UiGroup>
          <CoreUiButton iconLeft={IconUsersGroup} to="/management/teams">
            Manage Teams
          </CoreUiButton>
          <CoreUiButton
            iconLeft={IconPlus}
            onClick={() =>
              modals.open({
                title: 'Add Project',
                centered: true,
                children: <div>TBD</div>,
              })
            }
          >
            Add Project
          </CoreUiButton>
        </UiGroup>
      }
    >
      <UiStack>
        <UiCard>PROJECTS</UiCard>
      </UiStack>
    </UiPage>
  )
}
