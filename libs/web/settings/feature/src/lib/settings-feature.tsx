import { CoreUiGrid } from '@deanslist-platform/web-core-ui'
import { useUserProfile } from '@deanslist-platform/web-user-data-access'
import { UserUiProfile, UserUiUpdateForm } from '@deanslist-platform/web-user-ui'
import { Button } from '@mantine/core'
import { UiCard, UiContainer, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { SettingsIdentityFeature } from './settings-identity-feature'

export default function SettingsFeature() {
  const { updateUser, user, query } = useUserProfile()

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found" />
  }

  return (
    <UiContainer>
      <CoreUiGrid
        sidebar={
          <UserUiProfile
            user={user}
            action={
              <Button size="xs" variant="light" component={Link} to={user.profileUrl}>
                View profile
              </Button>
            }
          />
        }
      >
        <UiStack gap="xl">
          <UiCard title="Edit profile">
            <UserUiUpdateForm user={user} submit={updateUser} />
          </UiCard>
          <UiCard title="Manage Identities">
            <SettingsIdentityFeature />
          </UiCard>
        </UiStack>
      </CoreUiGrid>
    </UiContainer>
  )
}
