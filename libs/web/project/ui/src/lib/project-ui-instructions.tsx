import { Project } from '@deanslist-platform/sdk'
import { Text, TypographyStylesProvider } from '@mantine/core'
import Markdown from 'react-markdown'

export function ProjectUiInstructions({ item }: { item: Project }) {
  if (!item.instructions?.trim().length) {
    return null
  }
  return (
    <TypographyStylesProvider p={0}>
      <Text>Instructions</Text>
      <Markdown>{item.instructions}</Markdown>
    </TypographyStylesProvider>
  )
}
