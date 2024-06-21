import { IdentityProvider } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { useUserFindManyIdentity } from '@deanslist-platform/web-identity-data-access'
import { IdentityUiLinkButton } from '@deanslist-platform/web-identity-ui'
import { Flex, Paper, rem, Stack, Title, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { UiStack, useUiColorScheme } from '@pubkey-ui/core'
import { Navigate, useNavigate } from 'react-router-dom'

export function OnboardingFeature() {
  const navigate = useNavigate()
  const { user, refresh, isOnboarded } = useAuth()
  const { query } = useUserFindManyIdentity({
    username: user?.username as string,
  })
  const { breakpoints } = useMantineTheme()
  const isSmall = useMediaQuery(`(max-width: ${breakpoints.sm}`)
  const { colorScheme } = useUiColorScheme()
  const border = `${rem(1)} solid var(mantine-color-${colorScheme === 'dark' ? 'dark-7' : 'gray-3'})`

  if (isOnboarded) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Flex direction="column" w="100%" h="100%" justify="center" align="center">
      <Paper
        h={isSmall ? '100%' : undefined}
        w={isSmall ? '100%' : rem(550)}
        p="xl"
        bg={colorScheme === 'dark' ? 'dark.9' : undefined}
        style={{ border: isSmall ? undefined : border }}
      >
        <UiStack align="center" gap="xl">
          <Stack align="center">
            <Title order={2} c={colorScheme === 'dark' ? 'white' : 'black'} ta="center" my="md">
              One more step before you begin...
            </Title>
          </Stack>
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
      </Paper>
    </Flex>
  )
}
