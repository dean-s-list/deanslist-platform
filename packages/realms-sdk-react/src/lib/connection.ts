import { useConnection } from '@solana/wallet-adapter-react'

export function useRealmsConnection() {
  const { connection } = useConnection()

  return { connection }
}
