import { ellipsify, Identity, IdentityProvider } from '@deanslist-platform/sdk'
import { Avatar, Box, Image, Tooltip } from '@mantine/core'

export function IdentityUiAvatar({ item, withTooltip = false }: { item: Identity; withTooltip?: boolean }) {
  const content =
    item.provider === IdentityProvider.Solana ? (
      <Box
        style={{ border: '1px solid black', backgroundColor: 'black', borderRadius: '50%', overflow: 'hidden' }}
        p="xs"
      >
        <Image h={18} bg="black" src="/assets/solana-logo-mark.png" />
      </Box>
    ) : item.profile?.avatarUrl ? (
      <Avatar radius={100} src={item.profile?.avatarUrl} alt={`${item.provider} avatar`} />
    ) : (
      <Avatar radius={100}>{item.profile?.username.substring(0, 1)}</Avatar>
    )

  return withTooltip ? (
    <Tooltip label={`${item.profile?.username ?? ellipsify(item.providerId)} on ${item.provider}`} withArrow>
      {content}
    </Tooltip>
  ) : (
    content
  )
}
