import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiHeader, CoreUiLayout, CoreUiLogo, CoreUiLogoType } from '@deanslist-platform/web-core-ui'
import { Button, Group } from '@mantine/core'
import { UiAvatar, UiLoader } from '@pubkey-ui/core'
import { IconLogout } from '@tabler/icons-react'
import { ReactNode, Suspense } from 'react'

export function OnboardingLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()

  return (
    <CoreUiLayout
      styles={{ root: { height: '100%' }, main: { height: '100%' } }}
      header={
        <CoreUiHeader
          logoSmall={<CoreUiLogo height={28} />}
          logo={<CoreUiLogoType height={28} />}
          profile={
            <Group gap="xs">
              <Button variant="light" leftSection={<IconLogout size="0.9rem" stroke={1.5} />} onClick={logout}>
                Logout
              </Button>
              <UiAvatar
                url={user?.avatarUrl}
                name={user?.username}
                alt={user?.username ?? 'User Avatar'}
                radius={100}
                size={34}
              />
            </Group>
          }
        />
      }
    >
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </CoreUiLayout>
  )
}
