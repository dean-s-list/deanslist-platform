import { Comment, Project, ProjectMember, Rating } from '@prisma/client'

import { getProjectFees } from './get-project-fees'

// Total amount of USDC minus manager and referral and reviews
export function getProjectAmountTotalUsdLeft(project: Project, members: ProjectMember[] = []) {
  if (project.amountTotalUsd < 1 || !members.length) {
    return 0
  }
  const left = getProjectAmountUsd(project)

  if (left < 1) {
    return 0
  }

  return left - getProjectReviewTotalUsdLeft(members)
}

// Total amount of USDC minus manager and referral
// This is the amount that can be used for reviews
export function getProjectAmountUsd(project: Project) {
  if (project.amountTotalUsd < 1) {
    return 0
  }
  const { manager, referral, total } = getProjectFees(project)

  return total - manager - referral
}

// Total of all the review amounts and bonuses
export function getProjectReviewTotalUsdLeft(members: ProjectMember[] = []) {
  if (!members.length) {
    return 0
  }

  const reviewAmounts = members.map((member) => member.amount)
  const bonusAmounts = members.map((member) => member.bonus)
  const totalAmounts = reviewAmounts.map((amount, index) => amount + bonusAmounts[index])

  return totalAmounts.reduce((acc, amount) => acc + amount, 0)
}

export function getRatingsFromReview(review: { comments?: Comment & { ratings?: Rating[] }[] }): Rating[] {
  return ((review.comments?.map((comment) => comment.ratings).flat() ?? []) as Rating[]).filter(Boolean)
}
