import { Community } from '@deanslist-platform/sdk'
import { CoreUiCard, CoreUiDivider } from '@deanslist-platform/web-core-ui'
import { Group, Text } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconCube, IconUsers } from '@tabler/icons-react'
import React, { ComponentType } from 'react'
import { CommunityUiItem } from './community-ui-item'

export function CommunityUiGridItem({ community, to }: { community: Community; to?: string }) {
  return (
    <CoreUiCard to={to} style={{ color: 'white' }}>
      <UiStack>
        <UiGroup>
          <CommunityUiItem community={community} />
        </UiGroup>
        <CoreUiDivider />
        <UiGroup>
          <CommunityUiItemDetail icon={IconCube} text={`${community.activeProjectsCount ?? 0} active projects`} />
          <CommunityUiItemDetail icon={IconUsers} text={`${community.managerCount ?? 0} managers`} />
        </UiGroup>
      </UiStack>
    </CoreUiCard>
  )
}

function CommunityUiItemDetail({ text, icon: Icon }: { text: string; icon: ComponentType<{ size: number }> }) {
  return (
    <Group gap="xs">
      <Icon size={16} />
      <Text span size="sm">
        {text}
      </Text>
    </Group>
  )
}
