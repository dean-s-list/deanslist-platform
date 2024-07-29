import { Project } from '@prisma/client'

export function getProjectFees(project: Project) {
  return {
    total: project.amountTotalUsd ?? 0,
    manager: project.amountManagerUsd ?? 0,
    referral: project.amountReferralUsd ?? 0,
  }
}
