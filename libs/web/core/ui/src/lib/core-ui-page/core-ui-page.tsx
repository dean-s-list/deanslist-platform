import { Box, Group, Title } from '@mantine/core'
import { UiContainer, UiGroup, UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function CoreUiPage({
  children,
  leftAction,
  rightAction,
  title,
  withContainer = true,
}: {
  children: ReactNode
  leftAction?: ReactNode
  rightAction?: ReactNode
  title?: ReactNode
  withContainer?: boolean
}) {
  const stack = (
    <UiStack>
      <Box>
        <UiGroup>
          <Group>
            {leftAction ? leftAction : null}
            <Title order={2}>{title ?? ''}</Title>
          </Group>
          {rightAction ? <Group>{rightAction}</Group> : null}
        </UiGroup>
      </Box>
      <UiStack my="xs" gap="xl">
        {children}
      </UiStack>
    </UiStack>
  )
  return withContainer ? <UiContainer>{stack}</UiContainer> : stack
}
