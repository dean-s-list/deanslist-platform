import { IdentityProvider } from '@deanslist-platform/sdk'
import { Button, ButtonProps } from '@mantine/core'
import { getIdentityProviderColor } from './get-identity-provider-color'
import { IdentityUiIcon } from './identity-ui-icon'

export function IdentityUiProviderButton({
  action,
  provider,
  ...props
}: ButtonProps & { action: 'link' | 'login'; provider: IdentityProvider }) {
  return (
    <Button
      bg={getIdentityProviderColor(provider)}
      variant="filled"
      size="xl"
      radius="xl"
      className={`identity-${action}-${provider}`.toLowerCase()}
      rightSection={<IdentityUiIcon provider={provider} />}
      component={'a'}
      href={`/api/auth/${provider.toLowerCase()}`}
      {...props}
    >
      {action === 'link' ? 'Link' : 'Login with'} {provider}
    </Button>
  )
}
