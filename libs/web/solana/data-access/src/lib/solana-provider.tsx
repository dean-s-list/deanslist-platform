import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { WalletError } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { ReactNode, useCallback, useMemo } from 'react'
import { ClusterProvider, useCluster } from './cluster-provider'

export function SolanaClusterProvider({
  autoConnect,
  endpoint,
  children,
}: {
  autoConnect?: boolean
  endpoint?: string
  children: ReactNode
}) {
  return (
    <ClusterProvider>
      <SolanaProvider autoConnect={autoConnect} endpoint={endpoint}>
        {children}
      </SolanaProvider>
    </ClusterProvider>
  )
}

export function SolanaProvider({
  autoConnect = true,
  endpoint: providedEndpoint,
  children,
}: {
  autoConnect?: boolean
  endpoint?: string
  children: ReactNode
}) {
  const { cluster } = useCluster()
  const endpoint = useMemo(() => providedEndpoint ?? cluster.endpoint, [cluster, providedEndpoint])

  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect={autoConnect}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
