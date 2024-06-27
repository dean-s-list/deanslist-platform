import { Connection } from '@solana/web3.js'

const connection = new Connection('https://mango.rpcpool.com', 'recent')
export default connection

export function useRealmsConnection() {
  return { connection }
}
