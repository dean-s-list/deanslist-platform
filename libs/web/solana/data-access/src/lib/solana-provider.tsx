import { AnchorProvider } from '@coral-xyz/anchor'
import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { WalletError } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import {
  AnchorWallet,
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { ReactNode, useCallback, useMemo } from 'react'
import { ClusterProvider, toWalletAdapterNetwork, useCluster } from './cluster-provider'

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
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network: toWalletAdapterNetwork(cluster.network) })],
    [cluster],
  )

  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export function useAnchorProvider() {
  const { connection } = useConnection()
  const wallet = useWallet()

  return new AnchorProvider(connection, wallet as AnchorWallet, { commitment: 'confirmed' })
}
