import { Anchor, DrawerProps, Group, Stack } from '@mantine/core'
import cx from 'clsx'
import { ComponentType, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CoreUiLogoType } from '../core-ui-logo'

import classes from './core-ui-navbar.module.css'

export interface CoreUiNavbarProps {
  base?: string
  drawerProps?: DrawerProps
  logo?: ReactNode
  logoSmall?: ReactNode
  links?: CoreUiNavbarLink[]
  opened?: boolean
  toggle?: () => void
}
export interface CoreUiNavbarLink {
  link: string
  label: string
  icon: ComponentType<{ size?: number; stroke?: number }>
}

export function CoreUiNavbar(props: CoreUiNavbarProps) {
  const { pathname } = useLocation()
  const opened = props.opened

  const items = props.links?.map(({ link, label, icon: Icon }) => (
    <Anchor
      component={Link}
      key={label}
      to={link}
      size="xl"
      fw={500}
      className={cx(classes.link, { [classes.linkActive]: pathname.startsWith(link) })}
      onClick={close}
    >
      <Group>
        <Icon size={24} stroke={1.5} />
        {label}
      </Group>
    </Anchor>
  ))

  function close() {
    if (!opened || !props.toggle) return
    props.toggle()
  }

  return (
    <Stack gap="lg">
      <Group justify="center" py="md">
        <Anchor component={Link} to={props.base ?? '/'} display="flex">
          <CoreUiLogoType height={64} />
        </Anchor>
      </Group>
      {items}
    </Stack>
  )
}
