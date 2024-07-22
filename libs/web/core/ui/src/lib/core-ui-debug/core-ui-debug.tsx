import { Box, Group, Paper, PaperProps, Text, UnstyledButton, useMantineTheme } from '@mantine/core'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { ReactNode, useState } from 'react'

export function CoreUiDebug({
  data,
  hideButton,
  open,
  ...props
}: PaperProps & {
  data: string | unknown
  open?: boolean
  hideButton?: boolean
}) {
  const theme = useMantineTheme()
  const [show, setShow] = useState(open)
  const content: ReactNode = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  return (
    <Paper
      component="pre"
      fz="xs"
      m={0}
      p={theme.spacing.xs}
      style={{ overflow: 'auto', textOverflow: 'ellipsis' }}
      withBorder
      {...props}
    >
      {hideButton ? null : (
        <UnstyledButton onClick={() => setShow(!show)}>
          <Group p="xs" gap="xs">
            {show ? <IconEyeOff size={16} /> : <IconEye size={16} />}
            <Text size="xs">{show ? 'Hide' : 'Show'} debug data</Text>
          </Group>
        </UnstyledButton>
      )}
      <Box display={show ? 'block' : 'none'}>{content}</Box>
    </Paper>
  )
}
