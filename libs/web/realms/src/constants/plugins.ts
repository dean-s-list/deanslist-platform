import { PublicKey } from '@solana/web3.js'
import { DEFAULT_NFT_VOTER_PLUGIN } from '@realms/tools/constants'

export const VSR_PLUGIN_PKS: string[] = [
  '4Q6WW2ouZ6V3iaNm56MTd5n2tnTm4C5fiH8miFHnAFHo',
  'vsr2nfGVNHmSY8uxoBGqq8AQbwz3JwaEaHqGbsTPXqQ',
  'VotEn9AWwTFtJPJSMV5F9jsMY6QwWM5qn3XP9PATGW7',
  'VoteWPk9yyGmkX4U77nEWRJWpcc8kUfrPoghxENpstL',
  'VoteMBhDCqGLRgYpp9o7DGyq81KNmwjXQRAHStjtJsS',
  '5sWzuuYkeWLBdAv3ULrBfqA51zF7Y4rnVzereboNDCPn',
]

export const NFT_PLUGINS_PKS: string[] = [
  DEFAULT_NFT_VOTER_PLUGIN,
  'GnftV5kLjd67tvHpNGyodwWveEKivz3ZWvvE3Z4xi2iw',
  'GnftVc21v2BRchsRa9dGdrVmJPLZiRHe9j2offnFTZFg', // v2, supporting compressed nft
]

export const GATEWAY_PLUGINS_PKS: string[] = ['GgathUhdrCWRHowoRKACjgWhYHfxCEdBi5ViqYN6HVxk']

export const QV_PLUGINS_PKS: string[] = ['quadCSapU8nTdLg73KHDnmdxKnJQsh7GUbu5tZfnRRr']

export const PYTH_PLUGIN_PK: string[] = ['pytS9TjG1qyAZypk7n8rw8gfW9sUaqqYyMhJQ4E7JCQ']

export type PluginName =
  | 'gateway'
  | 'QV'
  | 'vanilla'
  | 'VSR'
  | 'HeliumVSR'
  | 'NFT'
  | 'pyth'
  | 'drift'
  | 'token_haver'
  | 'unknown'

export const findPluginName = (programId: PublicKey | undefined): PluginName =>
  programId === undefined
    ? ('vanilla' as const)
    : VSR_PLUGIN_PKS.includes(programId.toString())
    ? ('VSR' as const)
    : NFT_PLUGINS_PKS.includes(programId.toString())
    ? 'NFT'
    : GATEWAY_PLUGINS_PKS.includes(programId.toString())
    ? 'gateway'
    : QV_PLUGINS_PKS.includes(programId.toString())
    ? 'QV'
    : PYTH_PLUGIN_PK.includes(programId.toString())
    ? 'pyth'
    : 'unknown'
