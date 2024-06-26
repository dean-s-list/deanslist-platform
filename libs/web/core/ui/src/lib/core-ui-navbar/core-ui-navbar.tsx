import { Anchor, DrawerProps, Stack } from '@mantine/core'
import cx from 'clsx'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
}

export function CoreUiNavbar(props: CoreUiNavbarProps) {
  const { pathname } = useLocation()
  const opened = props.opened

  const items = props.links?.map((link) => (
    <Anchor
      component={Link}
      key={link.label}
      to={link.link}
      className={cx(classes.link, { [classes.linkActive]: pathname.startsWith(link.link) })}
      onClick={close}
    >
      {link.label}
    </Anchor>
  ))

  function close() {
    if (!opened || !props.toggle) return
    props.toggle()
  }

  return <Stack gap="sm">{items}</Stack>
}
