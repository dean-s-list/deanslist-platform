import { BN } from '@coral-xyz/anchor'
import { Text } from '@mantine/core'
import BigNumber from 'bignumber.js'

function formatBN(value: BN, decimals: number) {
  const num = new BigNumber(value.toString()).shiftedBy(-decimals)

  if (typeof Intl === 'undefined' || typeof navigator === 'undefined') {
    return num.toFormat()
  }

  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: decimals,
  })
  return formatter.format(num.toNumber())
}
export function CoreUiBignumber({ bn }: { bn: BN }) {
  return <Text>{formatBN(bn.div(new BN(10000)), 2)}</Text>
}
