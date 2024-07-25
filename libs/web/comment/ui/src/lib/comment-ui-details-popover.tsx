import type { Comment } from '@deanslist-platform/sdk'
import { Button, Popover } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import React from 'react'
import { CommentUiDetailsTable } from './comment-ui-details-table'

export function CommentUiDetailsPopover({ comment }: { comment: Comment }) {
  return (
    <Popover position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button size="xs" radius="xl" rightSection={<IconInfoCircle size={16} />} variant="light">
          Details
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <CommentUiDetailsTable comment={comment} />
      </Popover.Dropdown>
    </Popover>
  )
}
