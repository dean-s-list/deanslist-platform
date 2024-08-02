import { ProjectMember, ProjectRole } from '@prisma/client'
import { getRatingAverages } from './get-rating-averages'

export type ProjectMemberDetails = Pick<ProjectMember, 'id' | 'role' | 'amount' | 'bonus'>

export interface SplitProjectAmountItem {
  member: ProjectMemberDetails
  ratings?: number[]
}

export interface SplitProjectAmountInput {
  items: SplitProjectAmountItem[]
  amountTotalUsd: number
  amountManagerUsd: number
  amountReferralUsd: number
}

export function splitProjectAmounts({
  items,
  amountTotalUsd,
  amountManagerUsd,
  amountReferralUsd,
}: SplitProjectAmountInput): ProjectMemberDetails[] {
  const roleAmounts = [
    { role: ProjectRole.Reviewer, amount: amountTotalUsd - amountManagerUsd - amountReferralUsd },
    { role: ProjectRole.Manager, amount: amountManagerUsd },
    { role: ProjectRole.Referral, amount: amountReferralUsd },
  ]

  const result: ProjectMemberDetails[] = []

  for (const { amount: roleAmount, role } of roleAmounts) {
    const memberRatings = items.filter(({ member }) => member.role === role)

    const amounts =
      role === ProjectRole.Reviewer
        ? getRatingAverages([...memberRatings.map(({ member: { id }, ratings = [] }) => ({ id, ratings }))], roleAmount)
        : getAmounts(memberRatings, roleAmount)

    result.push(...memberRatings.map(({ member }) => ({ ...member, amount: amounts[member.id], bonus: 0 })))
  }

  return result
}

export function getAmounts(items: { member: { id: string } }[], total: number) {
  return items.reduce(
    (acc, { member: { id } }) => ({ ...acc, [id]: Math.floor(total / items.length) }),
    {} as Record<string, number>,
  )
}
