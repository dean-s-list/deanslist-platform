import { useAdminDeleteProjectChannel, useAdminDeleteTeamChannel } from '@deanslist-platform/web-discord-data-access'
import { ActionIcon, ActionIconProps } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconTrash } from '@tabler/icons-react'

export function AdminDiscordUiProjectChannelDeleteButton({
  projectId,
  channelId,
  refresh,
  ...props
}: ActionIconProps & {
  channelId: string
  projectId: string
  refresh: () => void
}) {
  const { mutation } = useAdminDeleteProjectChannel({ channelId, projectId })

  return (
    <ActionIcon
      variant="light"
      color="red"
      onClick={() => {
        modals.openConfirmModal({
          title: 'Delete channel',
          children: `Are you sure you want to remove this channel from the project?`,
          labels: { confirm: 'Leave', cancel: 'Cancel' },
          confirmProps: { loading: mutation.isPending },
          onConfirm: () => mutation.mutateAsync().then(() => refresh()),
        })
      }}
      loading={mutation.isPending}
      {...props}
    >
      <IconTrash size={16} />
    </ActionIcon>
  )
}
export function AdminDiscordUiTeamChannelDeleteButton({
  teamId,
  channelId,
  refresh,
  ...props
}: ActionIconProps & {
  channelId: string
  teamId: string
  refresh: () => void
}) {
  const { mutation } = useAdminDeleteTeamChannel({ channelId, teamId })

  return (
    <ActionIcon
      variant="light"
      color="red"
      onClick={() => {
        modals.openConfirmModal({
          title: 'Delete channel',
          children: `Are you sure you want to remove this channel from the team?`,
          labels: { confirm: 'Leave', cancel: 'Cancel' },
          confirmProps: { loading: mutation.isPending },
          onConfirm: () => mutation.mutateAsync().then(() => refresh()),
        })
      }}
      loading={mutation.isPending}
      {...props}
    >
      <IconTrash size={16} />
    </ActionIcon>
  )
}
