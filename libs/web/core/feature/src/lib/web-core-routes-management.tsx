import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiBackLink, CoreUiButton } from '@deanslist-platform/web-core-ui'
import { ManagerProjectCommunityFeature } from '@deanslist-platform/web-project-feature'
import { ManagerCommunityFeature } from '@deanslist-platform/web-community-feature'
import { Box } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiContainer, UiGroup, UiPage, UiStack } from '@pubkey-ui/core'
import { IconPlus, IconUsersGroup } from '@tabler/icons-react'
import { Navigate, useLocation, useRoutes } from 'react-router-dom'

export default function () {
  const { isManager } = useAuth()

  if (!isManager) {
    return <Navigate to="/dashboard" replace />
  }

  return useRoutes([
    { path: '', element: <Navigate to="projects" replace /> },
    { path: '/projects/*', element: <ManagementProjectsFeature /> },
    { path: '/communities/*', element: <ManagerCommunityFeature /> },
  ])
}

export function ManagementProjectsFeature() {
  const { isManager } = useAuth()
  const { pathname } = useLocation()
  if (!isManager) {
    return <Navigate to="/dashboard" replace />
  }

  const isIndex = pathname === '/management/projects/' || pathname === '/management/projects'

  return isIndex ? (
    <UiPage
      title="Projects"
      rightAction={
        <UiGroup>
          <CoreUiButton iconLeft={IconUsersGroup} to="/management/communities">
            Manage Communities
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
      <Box>
        <ManagerProjectCommunityFeature />
      </Box>
    </UiPage>
  ) : (
    <Box>
      <UiContainer>
        <UiStack>
          <UiGroup>
            <CoreUiBackLink label="Back to overview" />
          </UiGroup>
          <Box>
            <ManagerProjectCommunityFeature />
          </Box>
        </UiStack>
      </UiContainer>
    </Box>
  )
}
