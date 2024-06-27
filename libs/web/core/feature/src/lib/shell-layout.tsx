import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiHeader, CoreUiHeaderProfile, CoreUiLayout } from '@deanslist-platform/web-core-ui'
import { ActionIcon, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiLoader } from '@pubkey-ui/core'
import { IconBrandDiscord, IconShield } from '@tabler/icons-react'
import { ReactNode, Suspense } from 'react'
import { Link } from 'react-router-dom'

export function ShellLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, logout } = useAuth()
  const [opened, { toggle }] = useDisclosure(false)
  const profile = <CoreUiHeaderProfile user={user} logout={logout} />

  return (
    <CoreUiLayout
      header={
        <CoreUiHeader
          opened={opened}
          toggle={toggle}
          links={[
            { link: '/projects', label: 'Projects' },
            { link: '/teams', label: 'Teams' },
            { link: '/leaderboard', label: 'Leaderboard' },
            { link: `${user?.profileUrl}`, label: 'Profile' },
          ]}
          profile={
            isAdmin ? (
              <Group gap="xs">
                <ActionIcon component={Link} to="/admin/discord" size="lg" variant="light">
                  <IconBrandDiscord />
                </ActionIcon>
                <ActionIcon component={Link} to="/admin" size="lg" variant="light">
                  <IconShield />
                </ActionIcon>
                {profile}
              </Group>
            ) : (
              profile
            )
          }
        />
      }
    >
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </CoreUiLayout>
  )
}
