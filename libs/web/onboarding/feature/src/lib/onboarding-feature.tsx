import { IdentityProvider } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiLogoType, pinkGradientText } from '@deanslist-platform/web-core-ui'
import { useUserFindManyIdentity } from '@deanslist-platform/web-identity-data-access'
import { IdentityUiLinkButton } from '@deanslist-platform/web-identity-ui'
import { Box, Flex, Group, Stack, Stepper, Text } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export function OnboardingFeature() {
  const navigate = useNavigate()
  const { user, refresh, isOnboarded } = useAuth()
  const { query } = useUserFindManyIdentity({
    username: user?.username as string,
  })
  const [active, setActive] = useState(1)
  if (isOnboarded) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Flex justify="center" align="center" direction="column">
      <Box miw={400} p="lg">
        <UiStack gap={48} align="center">
          <Group justify="center">
            <CoreUiLogoType height={48} />
          </Group>
          <Stack mb="xl" align="center" gap={0}>
            <Text fz={28} fw={500} c="white">
              One more step before you begin...
            </Text>
          </Stack>

          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step label="Login with Discord" />
            <Stepper.Step label="Link wallet" />
            <Stepper.Step label="Enjoy and earn rewards" />
          </Stepper>

          <Text fz="lg" c="white">
            We need this so you can start adding feedback and{' '}
            <Text component="span" inherit styles={{ root: { ...pinkGradientText } }}>
              earn rewards
            </Text>
          </Text>

          <IdentityUiLinkButton
            loading={query.isLoading}
            identities={[]}
            refresh={() =>
              query
                .refetch()
                .then(() => refresh())
                .then(() => {
                  if (isOnboarded) {
                    navigate('/dashboard')
                  }
                })
            }
            provider={IdentityProvider.Solana}
            size="xl"
          />
        </UiStack>
      </Box>
    </Flex>
  )
}
