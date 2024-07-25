import type { Comment } from '@deanslist-platform/sdk'
import { UiInfoTable } from '@pubkey-ui/core'
import React from 'react'

export function CommentUiDetailsTable({ comment }: { comment: Comment }) {
  return (
    <UiInfoTable
      tdw="130"
      items={[
        ['Browser version', comment.versionBrowser ?? 'Unknown'],
        ['OS version', comment.versionOs ?? 'Unknown'],
      ]}
    />
  )
}
