import { Paper, PaperProps } from '@mantine/core'
import { UiAnchor } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export interface CoreUiCardProps extends PaperProps {
  children?: ReactNode
  to?: string
}

export function CoreUiCard({ children, to, ...props }: CoreUiCardProps) {
  const element = (
    <Paper className="gradient-card" p="md" radius="lg" {...props}>
      {children}
    </Paper>
  )
  return to ? (
    <UiAnchor to={to} style={{ textDecoration: 'none' }}>
      {element}
    </UiAnchor>
  ) : (
    element
  )
}
