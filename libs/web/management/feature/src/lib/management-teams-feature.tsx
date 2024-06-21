import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiBackLink, CoreUiButton } from '@deanslist-platform/web-core-ui'
import { modals } from '@mantine/modals'
import { UiCard, UiPage, UiStack } from '@pubkey-ui/core'
import { IconPlus } from '@tabler/icons-react'
import { Navigate } from 'react-router-dom'

export function ManagementTeamsFeature() {
  const { isAdmin, isManager } = useAuth()

  if (!isManager) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <UiPage
      title="Teams"
      leftAction={<CoreUiBackLink label="Back to overview" to="/management/projects" />}
      rightAction={
        isAdmin ? (
          <CoreUiButton
            iconLeft={IconPlus}
            onClick={() =>
              modals.open({
                title: 'Add Team',
                centered: true,
                children: <div>TBD</div>,
              })
            }
          >
            Add Team
          </CoreUiButton>
        ) : null
      }
    >
      <UiStack>
        <UiCard>TEAMS</UiCard>
      </UiStack>
    </UiPage>
  )
}
