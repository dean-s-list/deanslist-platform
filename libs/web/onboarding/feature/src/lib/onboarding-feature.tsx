import { IdentityProvider } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiLogoType } from '@deanslist-platform/web-core-ui'
import { useUserFindManyIdentity } from '@deanslist-platform/web-identity-data-access'
import { IdentityUiLinkButton } from '@deanslist-platform/web-identity-ui'
import { Box, Flex, Group, Stepper, Title } from '@mantine/core'
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
            <CoreUiLogoType height={64} />
          </Group>
          <Title order={1}>One more step before you begin...</Title>

          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step label="Login with Discord" />
            <Stepper.Step label="Link wallet" />
            <Stepper.Step label="Enjoy and earn rewards" />
          </Stepper>

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
