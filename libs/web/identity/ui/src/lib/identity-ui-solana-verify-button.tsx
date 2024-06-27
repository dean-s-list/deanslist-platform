import { ellipsify, Identity, IdentityProvider } from '@deanslist-platform/sdk'
import { IdentityProviderSolanaLink } from '@deanslist-platform/web-identity-data-access'
import { SolanaClusterProvider } from '@deanslist-platform/web-solana-data-access'
import { Button, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconAlertCircle } from '@tabler/icons-react'
import { IdentityUiSolanaVerifyWizard } from './identity-ui-solana-verify-wizard'

export function IdentityUiSolanaVerifyButton({ identity, refresh }: { identity: Identity; refresh: () => void }) {
  return identity.provider === IdentityProvider.Solana ? (
    <Tooltip label={`Verify ${ellipsify(identity.providerId)} by signing a message with your wallet.`}>
      <Button
        size="xs"
        variant="light"
        color="yellow"
        leftSection={<IconAlertCircle size={14} />}
        onClick={() => {
          modals.open({
            title: 'Verify Identity',
            zIndex: 1000,
            size: 'xl',
            children: (
              <SolanaClusterProvider autoConnect={true}>
                <IdentityProviderSolanaLink refresh={refresh}>
                  <IdentityUiSolanaVerifyWizard
                    identity={identity}
                    refresh={() => {
                      refresh()
                      modals.closeAll()
                    }}
                  />
                </IdentityProviderSolanaLink>
              </SolanaClusterProvider>
            ),
          })
        }}
      >
        Verify Identity
      </Button>
    </Tooltip>
  ) : null
}
