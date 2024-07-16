import { Paper, PaperProps } from '@mantine/core'
import { UiAnchor, UiCardTitle } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export interface CoreUiCardProps extends PaperProps {
  children?: ReactNode
  title?: string
  to?: string
}

export function CoreUiCard({ children, to, title, ...props }: CoreUiCardProps) {
  const element = (
    <Paper className="gradient-card" p="md" radius="lg" {...props}>
      {title ? <UiCardTitle>{title}</UiCardTitle> : null}
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
