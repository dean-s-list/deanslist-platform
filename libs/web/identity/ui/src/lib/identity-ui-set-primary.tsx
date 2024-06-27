import { Identity, IdentityProvider } from '@deanslist-platform/sdk'
import { ActionIcon, Tooltip } from '@mantine/core'
import { IconStar, IconStarFilled } from '@tabler/icons-react'

export function IdentityUiSetPrimary({ item, setPrimary }: { item: Identity; setPrimary: (id: string) => void }) {
  if (item.provider !== IdentityProvider.Solana) {
    return null
  }
  return (
    <Tooltip label={item.primary ? 'Primary identity' : 'Set as primary identity'} withArrow position="top">
      <ActionIcon disabled={!!item.primary} onClick={() => setPrimary(item.id)} color="green" variant="light" size="sm">
        {item.primary ? <IconStarFilled size={14} color="yellow" /> : <IconStar size={14} />}
      </ActionIcon>
    </Tooltip>
  )
}
