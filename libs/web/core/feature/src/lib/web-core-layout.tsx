import { useAuth } from '@deanslist-platform/web-auth-data-access'
import {
  CoreUiHeader,
  CoreUiHeaderProfile,
  CoreUiLayout,
  CoreUiNavbar,
  CoreUiNavbarLink,
} from '@deanslist-platform/web-core-ui'
import { Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiLoader } from '@pubkey-ui/core'
import { WalletMultiIcon } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { IconChairDirector, IconChecks, IconCube, IconListNumbers, IconSettings, IconShield } from '@tabler/icons-react'
import { ReactNode, Suspense, useMemo } from 'react'

export function WebCoreLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, isManager, logout } = useAuth()
  const [opened, { toggle }] = useDisclosure(false)
  const links: CoreUiNavbarLink[] = useMemo(
    () =>
      [
        { link: '/projects', label: 'Projects', icon: IconCube },
        { link: '/reviews', label: 'My reviews', icon: IconChecks },
        { link: '/leaderboard', label: 'Leaderboard', icon: IconListNumbers },
        isManager ? { link: '/management', label: 'Management', icon: IconChairDirector } : null,
        isAdmin ? { link: '/admin', label: 'Admin', icon: IconShield } : null,
        { link: `/settings`, label: 'Settings', icon: IconSettings },
      ].filter(Boolean) as CoreUiNavbarLink[],
    [isAdmin, isManager],
  )

  return (
    <CoreUiLayout
      zIndex={50}
      header={
        <CoreUiHeader
          opened={opened}
          toggle={toggle}
          showBurger
          showDrawer={false}
          profile={
            <Group>
              <WalletMultiIcon radius="md" variant="subtle" />
              <CoreUiHeaderProfile user={user} logout={logout} />
            </Group>
          }
        />
      }
      navbar={<CoreUiNavbar opened={opened} toggle={toggle} links={links} />}
      navbarConfig={{ collapsed: { mobile: !opened } }}
    >
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </CoreUiLayout>
  )
}
