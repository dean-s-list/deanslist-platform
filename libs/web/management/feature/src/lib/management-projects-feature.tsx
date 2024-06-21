import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiButton } from '@deanslist-platform/web-core-ui'
import { modals } from '@mantine/modals'
import { UiCard, UiGroup, UiPage, UiStack } from '@pubkey-ui/core'
import { IconPlus, IconUsersGroup } from '@tabler/icons-react'
import { Navigate } from 'react-router-dom'

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
