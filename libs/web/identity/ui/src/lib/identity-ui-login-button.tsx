import { IdentityProvider } from '@deanslist-platform/sdk'
import type { ButtonProps } from '@mantine/core'
import { IdentityUiProviderButton } from './identity-ui-provider-button'
import { IdentityUiSolanaLoginButton } from './identity-ui-solana-login-button'

export function IdentityUiLoginButton({
  provider,
  refresh,
  ...props
}: ButtonProps & { provider: IdentityProvider; refresh: () => void }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IdentityUiProviderButton action="login" provider={provider} fullWidth {...props} />
    case IdentityProvider.Solana:
      return <IdentityUiSolanaLoginButton refresh={refresh} fullWidth {...props} />
    default:
      return null
  }
}
