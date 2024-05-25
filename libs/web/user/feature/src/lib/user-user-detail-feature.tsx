import { ellipsify } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiGrid } from '@deanslist-platform/web-core-ui'
import { useUserFindManyIdentity } from '@deanslist-platform/web-identity-data-access'
import { IdentityUiAvatar, IdentityUiBadge, IdentityUiLink } from '@deanslist-platform/web-identity-ui'
import { useUserFineOneUser } from '@deanslist-platform/web-user-data-access'
import { UserUiProfile } from '@deanslist-platform/web-user-ui'
import { Button, Group, SimpleGrid, Stack, Text } from '@mantine/core'
import { UiCard, UiContainer, UiDebugModal, UiGroup, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { Link, useParams } from 'react-router-dom'

export function UserUserDetailFeature() {
  const { user: authUser } = useAuth()
  const { username } = useParams<{ username: string }>() as { username: string }
  const { user, query } = useUserFineOneUser({ username })
  const { items } = useUserFindManyIdentity({ username })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarning message="User not found" />
  }

  const isAuthUser = authUser?.id === user.id

  return (
    <UiContainer>
      <CoreUiGrid
        sidebar={
          <UserUiProfile
            user={user}
            action={
              isAuthUser ? (
                <Button size="xs" variant="light" component={Link} to={`/settings`}>
                  Edit profile
                </Button>
              ) : null
            }
          />
        }
      >
        <UiStack>
          <SimpleGrid cols={{ md: 2 }}>
            {items?.map((identity) => (
              <UiCard key={identity.id}>
                <UiGroup align="start">
                  <Group>
                    <IdentityUiAvatar item={identity} />
                    <Stack gap={0}>
                      <Text size="lg" fw="bold">
                        {ellipsify(identity.name ?? identity.providerId, 6)}
                      </Text>
                      <IdentityUiBadge provider={identity.provider} />
                    </Stack>
                  </Group>
                  <Group gap={2}>
                    <UiDebugModal data={identity} />
                    <IdentityUiLink item={identity} />
                  </Group>
                </UiGroup>
              </UiCard>
            ))}
          </SimpleGrid>
        </UiStack>
      </CoreUiGrid>
    </UiContainer>
  )
}
