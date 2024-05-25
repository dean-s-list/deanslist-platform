import { DiscordBot } from '@deanslist-platform/sdk'
import { Button } from '@mantine/core'

export function DiscordUiBotInviteButton({ item }: { item: DiscordBot }) {
  return (
    <Button component="a" href={item?.inviteUrl ?? ''} target="_blank" rel="noreferrer noopener" variant="light">
      Invite Bot
    </Button>
  )
}
