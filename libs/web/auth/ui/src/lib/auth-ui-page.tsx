import { CoreUiLogoType, pinkGradientText } from '@deanslist-platform/web-core-ui'
import { Box, Group, Stack, Text } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { AuthUiEnabled } from './auth-ui-enabled'
import { AuthUiFull } from './auth-ui-full'

export function AuthUiPage({ authEnabled, children }: { authEnabled: boolean; children: ReactNode }) {
  return (
    <AuthUiFull>
      <AuthUiEnabled authEnabled={authEnabled}>
        <Box mt="xl" miw={400} p="lg">
          <UiStack mt="xl" gap={48} align="center">
            <Group justify="center">
              <CoreUiLogoType height={48} />
            </Group>
            <Stack mb="xl" align="center" gap={0}>
              <Text fz={48} fw={500} c="white">
                Welcome to
              </Text>
              <Text fz={48} fw={500} c="white">
                Dean’s List Dashboard!
              </Text>
              <Text fz="lg" c="white">
                The place where we inspire and reward{' '}
                <Text component="span" inherit styles={{ root: { ...pinkGradientText } }}>
                  valuable feedback
                </Text>
              </Text>
            </Stack>

            <Stack mt="xl" align="center" gap={0}>
              {children}
            </Stack>
          </UiStack>
        </Box>
      </AuthUiEnabled>
    </AuthUiFull>
  )
}
