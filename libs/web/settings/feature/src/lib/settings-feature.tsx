import { CoreUiGrid } from '@deanslist-platform/web-core-ui'
import { useUserProfile } from '@deanslist-platform/web-user-data-access'
import { UserUiProfile, UserUiToggleDeveloperMode } from '@deanslist-platform/web-user-ui'
import { Button, Text } from '@mantine/core'
import { UiContainer, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { SettingsWalletsFeature } from './settings-wallets-feature'

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
          <SettingsWalletsFeature />
          <UiStack>
            <Text fz="xl" fw={500}>
              Advanced settings
            </Text>
            <UserUiToggleDeveloperMode user={user} updateUser={updateUser} />
          </UiStack>
        </UiStack>
      </CoreUiGrid>
    </UiContainer>
  )
}
