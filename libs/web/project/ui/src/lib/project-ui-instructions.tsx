import { Project } from '@deanslist-platform/sdk'
import { TypographyStylesProvider } from '@mantine/core'
import Markdown from 'react-markdown'

export function ProjectUiInstructions({ item }: { item: Project }) {
  if (!item.instructions?.trim().length) {
    return null
  }
  return (
    <TypographyStylesProvider>
      <Markdown>{item.instructions}</Markdown>
    </TypographyStylesProvider>
  )
}
