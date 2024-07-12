import { CoreUiLogoType, pinkGradientText } from '@deanslist-platform/web-core-ui'
import { Box, Group, Text, Title } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { AuthUiEnabled } from './auth-ui-enabled'
import { AuthUiFull } from './auth-ui-full'

export function AuthUiPage({ authEnabled, children }: { authEnabled: boolean; children: ReactNode }) {
  return (
    <AuthUiFull>
      <AuthUiEnabled authEnabled={authEnabled}>
        <Box miw={400} p="lg">
          <UiStack gap={48} align="center">
            <Group justify="center">
              <CoreUiLogoType height={64} />
            </Group>
            <Title order={1}>Welcome to Dean's List Dashboard!</Title>
            <Title order={4}>
              The place where we inspire and reward{' '}
              <Text component="span" inherit styles={{ root: { ...pinkGradientText } }}>
                valuable feedback
              </Text>
            </Title>
            {children}
          </UiStack>
        </Box>
      </AuthUiEnabled>
    </AuthUiFull>
  )
}
