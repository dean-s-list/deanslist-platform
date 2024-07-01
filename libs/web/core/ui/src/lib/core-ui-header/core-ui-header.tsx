import { Anchor, Burger, DrawerProps, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CoreUiLogoType } from '../core-ui-logo'

import classes from './core-ui-header.module.css'

export interface CoreUiHeaderProps {
  base?: string
  drawerProps?: DrawerProps
  logo?: ReactNode
  logoSmall?: ReactNode
  opened?: boolean
  profile?: ReactNode
  toggle?: () => void
  showBurger?: boolean
  showDrawer?: boolean
}

export function CoreUiHeader(props: CoreUiHeaderProps) {
  const [drawerOpened, { toggle: drawerToggle }] = useDisclosure(false)
  const opened = props.opened ?? drawerOpened
  const toggle = props.toggle ?? drawerToggle
  const showBurger = props.showBurger ?? false
  const burger = showBurger ? <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="md" /> : null

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Group>
            {burger}
            <Anchor component={Link} to={props.base ?? '/'} display="flex">
              <Group>{props.logoSmall ?? <CoreUiLogoType height={50} />}</Group>
            </Anchor>
          </Group>
        </Group>
        {props.profile ? <Group>{props.profile}</Group> : null}
      </div>
    </header>
  )
}
