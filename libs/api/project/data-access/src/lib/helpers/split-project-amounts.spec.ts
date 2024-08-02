import { ProjectRole } from '@prisma/client'
import { ProjectMemberDetails, SplitProjectAmountItem, splitProjectAmounts } from './split-project-amounts'

describe('splitProjectAmounts', () => {
  it('should split the amounts correctly', () => {
    const items: SplitProjectAmountItem[] = [
      { member: getProjectMember({ id: 'reviewer-1', role: 'Reviewer' }), ratings: [5, 5, 5, 5, 5] },
      { member: getProjectMember({ id: 'reviewer-2', role: 'Reviewer' }), ratings: [1, 1, 1, 1, 1] },
      { member: getProjectMember({ id: 'manager-1', role: 'Manager' }) },
      { member: getProjectMember({ id: 'manager-2', role: 'Manager' }) },
      { member: getProjectMember({ id: 'referral-1', role: 'Referral' }) },
    ]

    const result = splitProjectAmounts({
      items,
      amountTotalUsd: 1000,
      amountManagerUsd: 100,
      amountReferralUsd: 100,
    })

    expect(result.map((i) => ({ amount: i.amount, bonus: i.bonus, role: i.role, id: i.id }))).toMatchInlineSnapshot(`
      [
        {
          "amount": 625,
          "bonus": 0,
          "id": "reviewer-1",
          "role": "Reviewer",
        },
        {
          "amount": 125,
          "bonus": 0,
          "id": "reviewer-2",
          "role": "Reviewer",
        },
        {
          "amount": 50,
          "bonus": 0,
          "id": "manager-1",
          "role": "Manager",
        },
        {
          "amount": 50,
          "bonus": 0,
          "id": "manager-2",
          "role": "Manager",
        },
        {
          "amount": 100,
          "bonus": 0,
          "id": "referral-1",
          "role": "Referral",
        },
      ]
    `)
  })
  it('should split the amounts correctly 2', () => {
    const items: SplitProjectAmountItem[] = [
      { member: getProjectMember({ id: 'reviewer-1', role: 'Reviewer' }), ratings: [1, 1, 1, 1, 1] },
      { member: getProjectMember({ id: 'reviewer-2', role: 'Reviewer' }), ratings: [1, 1, 1, 1, 1] },
    ]

    const result = splitProjectAmounts({
      items,
      amountTotalUsd: 1000,
      amountManagerUsd: 100,
      amountReferralUsd: 100,
    })

    expect(result.map((i) => ({ amount: i.amount, bonus: i.bonus, role: i.role, id: i.id }))).toMatchInlineSnapshot(`
      [
        {
          "amount": 400,
          "bonus": 0,
          "id": "reviewer-1",
          "role": "Reviewer",
        },
        {
          "amount": 400,
          "bonus": 0,
          "id": "reviewer-2",
          "role": "Reviewer",
        },
      ]
    `)
  })
})

function getProjectMember({ id, role }: { id: string; role: ProjectRole }): ProjectMemberDetails {
  return {
    id,
    amount: 0,
    bonus: 0,
    role,
  }
}
