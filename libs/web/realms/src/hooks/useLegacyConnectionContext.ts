import { useMemo } from 'react'
import { useRealmsConnection } from '@realms/connection'

/**
 * @deprecated
 * this hook is part of a refactor effort, you should not use it
 * just use useConnection from @solana/wallet-adapter-react
 */
const useLegacyConnectionContext = () => {
  const { connection } = useRealmsConnection()
  return useMemo(
    () => ({
      current: connection,
      endpoint: connection.rpcEndpoint,
      cluster: connection.rpcEndpoint.includes('devnet') ? ('devnet' as const) : ('mainnet' as const),
    }),
    [connection],
  )
}

export default useLegacyConnectionContext
