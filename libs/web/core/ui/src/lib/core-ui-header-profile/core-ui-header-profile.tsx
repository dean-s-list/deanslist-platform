import { User, UserRole } from '@deanslist-platform/sdk'
import { Button, Menu } from '@mantine/core'
import { UiAvatar } from '@pubkey-ui/core'
import { IconBug, IconChevronDown, IconLogout, IconSettings, IconShield, IconUser } from '@tabler/icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function CoreUiHeaderProfile({ user, logout }: { user?: User | null; logout: () => void }) {
  const [open, setOpen] = useState(false)
  const isAdmin = user?.role === UserRole.Admin
  const isDeveloper = user?.developer ?? false

  return user ? (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      withinPortal
      withArrow
      arrowOffset={18}
    >
      <Menu.Target>
        <Button
          variant={open ? 'light' : 'default'}
          style={{ border: '1px solid white' }}
          color="brand"
          radius="xl"
          leftSection={
            <UiAvatar
              url={user?.avatarUrl}
              name={user?.username}
              alt={user?.username ?? 'User Avatar'}
              radius={100}
              size={24}
            />
          }
          rightSection={
            <IconChevronDown size={20} stroke={2.5} style={{ transform: open ? 'rotate(180deg)' : undefined }} />
          }
        >
          Profile
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} to={user.profileUrl} leftSection={<IconUser size="0.9rem" stroke={1.5} />}>
          View profile
        </Menu.Item>
        <Menu.Item component={Link} to="/settings" leftSection={<IconSettings size="0.9rem" stroke={1.5} />}>
          Your settings
        </Menu.Item>
        {isAdmin || isDeveloper ? <Menu.Divider /> : null}
        {isAdmin && (
          <Menu.Item component={Link} to="/admin" leftSection={<IconShield size="0.9rem" stroke={1.5} />}>
            Admin
          </Menu.Item>
        )}{' '}
        {isDeveloper && (
          <Menu.Item component={Link} to="/admin/development" leftSection={<IconBug size="0.9rem" stroke={1.5} />}>
            Development
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item leftSection={<IconLogout size="0.9rem" stroke={1.5} />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : null
}
