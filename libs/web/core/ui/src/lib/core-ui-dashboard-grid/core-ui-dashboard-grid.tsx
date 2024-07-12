import { SimpleGrid, Text, UnstyledButton, useMantineTheme } from '@mantine/core'
import { getColorByIndex } from '@pubkey-ui/core'
import { ComponentType } from 'react'
import { Link } from 'react-router-dom'

import classes from './core-ui-dashboard-grid.module.css'

export interface CoreUiDashboardItem {
  icon: ComponentType<{ color?: string; size: number | string }>
  label: string
  to: string
  color?: string
}

export interface CoreUiDashboardGridProps {
  links: CoreUiDashboardItem[]
}

export function CoreUiDashboardGrid({ links }: CoreUiDashboardGridProps) {
  const theme = useMantineTheme()

  const items = links.map((item, index) => {
    const color = theme.colors[item.color ?? getColorByIndex(index)][6]
    return (
      <UnstyledButton component={Link} to={item.to} key={item.label} className={classes.item}>
        <item.icon color={color} size={64} />
        <Text size="lg" mt={7} c={color}>
          {item.label}
        </Text>
      </UnstyledButton>
    )
  })

  return (
    <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} spacing={{ base: 'sm', md: 'xl' }}>
      {items}
    </SimpleGrid>
  )
}
