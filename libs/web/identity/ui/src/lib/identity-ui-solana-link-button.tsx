import { Identity } from '@deanslist-platform/sdk'
import { IdentityProviderSolanaLink } from '@deanslist-platform/web-identity-data-access'
import { SolanaClusterProvider } from '@deanslist-platform/web-solana-data-access'
import { Button, ButtonProps } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconWallet } from '@tabler/icons-react'
import { IdentityUiSolanaLinkWizard } from './identity-ui-solana-link-wizard'

export function identityLinkSolanaModal({ identities, refresh }: { identities?: Identity[]; refresh: () => void }) {
  modals.open({
    size: 'xl',
    title: 'Link Solana Wallet',
    zIndex: 100,
    centered: true,
    children: (
      <SolanaClusterProvider autoConnect={false}>
        <IdentityProviderSolanaLink refresh={refresh}>
          <IdentityUiSolanaLinkWizard
            identities={identities ?? []}
            refresh={() => {
              refresh()
              modals.closeAll()
            }}
          />
        </IdentityProviderSolanaLink>
      </SolanaClusterProvider>
    ),
  })
}

export function IdentityUiSolanaLinkButton({
  identities = [],
  label,
  refresh,
  ...props
}: ButtonProps & {
  identities?: Identity[]
  refresh: () => void
  label?: string
}) {
  return (
    <Button
      size="xl"
      variant="gradient"
      radius="xl"
      className="identity-solana"
      leftSection={<IconWallet size={28} />}
      {...props}
      onClick={() => {
        identityLinkSolanaModal({ identities, refresh })
      }}
    >
      {label ?? 'Link Solana Wallet'}
    </Button>
  )
}
