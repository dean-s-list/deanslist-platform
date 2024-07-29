import { Project, Review } from '@prisma/client'

import { getProjectFees } from './get-project-fees'

// Total amount of USDC minus manager and referral and reviews
export function getProjectAmountTotalUsdLeft(project: Project, reviews: Review[] = []) {
  if (project.amountTotalUsd < 1 || !reviews.length) {
    return 0
  }
  const left = getProjectAmountUsd(project)

  if (left < 1) {
    return 0
  }

  return left - getProjectReviewTotalUsdLeft(reviews)
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
export function getProjectReviewTotalUsdLeft(reviews: Review[] = []) {
  if (!reviews.length) {
    return 0
  }

  const reviewAmounts = reviews.map((review) => review.amount)
  const bonusAmounts = reviews.map((review) => review.bonus)
  const totalAmounts = reviewAmounts.map((amount, index) => amount + bonusAmounts[index])

  return totalAmounts.reduce((acc, amount) => acc + amount, 0)
}
