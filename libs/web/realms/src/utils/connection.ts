import type { EndpointTypes } from '@realms/models/types'
import { DEVNET_RPC, MAINNET_RPC } from '@realms/constants/endpoints'

export interface EndpointInfo {
  name: EndpointTypes
  url: string
}

const ENDPOINTS: EndpointInfo[] = [
  {
    name: 'mainnet',
    url: MAINNET_RPC,
  },
  {
    name: 'devnet',
    url: DEVNET_RPC,
  },
  {
    name: 'localnet',
    url: 'http://127.0.0.1:8899',
  },
]

/**
 * Given ConnectionContext, find the network.
 * @param connectionContext
 * @returns EndpointType
 */
export function getNetworkFromEndpoint(endpoint: string) {
  const network = ENDPOINTS.find((e) => e.url === endpoint)
  if (!network) {
    console.error(endpoint, ENDPOINTS)
    throw new Error(`Network not found for endpoint: ${endpoint}`)
  }
  return network?.name
}
