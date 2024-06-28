import { Community } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { Divider, Group, Paper, Text } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconCube, IconUsers } from '@tabler/icons-react'
import { ComponentType } from 'react'
import { CommunityUiItem } from './community-ui-item'

export function CommunityUiGridItem({ community, to }: { community: Community; to?: string }) {
  return (
    <Paper withBorder p="md" radius="lg">
      <UiStack>
        <UiGroup>
          <CommunityUiItem community={community} to={to} />
          <CoreUiDebugModal data={community} />
        </UiGroup>
        <Divider />
        <UiGroup>
          <Item icon={IconCube} text={`${community.activeProjectsCount ?? 0} active projects`} />
          <Item icon={IconUsers} text={`${community.managerCount ?? 0} managers`} />
        </UiGroup>
      </UiStack>
    </Paper>
  )
}

function Item({ text, icon: Icon }: { text: string; icon: ComponentType<{ size: number }> }) {
  return (
    <Group gap="xs">
      <Icon size={16} />
      <Text span size="sm">
        {text}
      </Text>
    </Group>
  )
}
