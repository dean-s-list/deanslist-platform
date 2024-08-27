import { Prisma } from '@prisma/client'

export function ensureSufficientFunds({
  amountTotalUsd,
  amountManagerUsd,
  amountReferralUsd,
}: Pick<Prisma.ProjectUpdateInput, 'amountTotalUsd' | 'amountManagerUsd' | 'amountReferralUsd'>) {
  if (!amountTotalUsd || typeof amountTotalUsd !== 'number') {
    return
  }
  if (amountTotalUsd < 0) {
    throw new Error(`Amount total USD must be greater than 0`)
  }
  if (typeof amountManagerUsd === 'number' && amountManagerUsd < 0) {
    throw new Error(`Amount manager USD must be greater than 0`)
  }
  if (typeof amountReferralUsd === 'number' && amountReferralUsd < 0) {
    throw new Error(`Amount referral USD must be greater than 0`)
  }
  // Now, we need to make sure that the amountTotalUsd is greater than the sum of amountManagerUsd and amountReferralUsd
  if (amountManagerUsd && amountReferralUsd) {
    if (amountTotalUsd < Number(amountManagerUsd) + Number(amountReferralUsd)) {
      throw new Error(`Amount total USD must be greater than the sum of amount manager and referral`)
    }
  } else if (amountManagerUsd) {
    if (amountTotalUsd < Number(amountManagerUsd)) {
      throw new Error(`Amount total USD must be greater than amount manager`)
    }
  } else if (amountReferralUsd) {
    if (amountTotalUsd < Number(amountReferralUsd)) {
      throw new Error(`Amount total USD must be greater than amount referral`)
    }
  }
}
