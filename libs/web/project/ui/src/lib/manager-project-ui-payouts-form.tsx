import {
  formatUsd,
  ManagerUpdateProjectMemberInput,
  Project,
  ProjectMember,
  ProjectRole,
  ProjectStatus,
} from '@deanslist-platform/sdk'
import { CoreUiButton, CoreUiDivider, CoreUiProgress } from '@deanslist-platform/web-core-ui'
import { Group, Text } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { ManagerProjectUiPayoutItemForm } from './manager-project-ui-payout-item-form'

export function ManagerProjectUiPayoutsForm({
  update,
  project,
  members,
  splitByRating,
}: {
  splitByRating: () => Promise<boolean>
  update: (reviewId: string, input: ManagerUpdateProjectMemberInput) => Promise<boolean>
  project: Project
  members: ProjectMember[]
}) {
  const disabled = project.status !== ProjectStatus.Closed
  const divided = (project.amountTotalUsdLeft ?? 0) / (project.amountTotalUsd ?? 0)
  const percentageLeft = divided ? divided * 100 : 0

  const amountTotal = project.amountTotalUsd ?? 0
  const amountManager = project.amountManagerUsd ?? 0
  const amountReferral = project.amountReferralUsd ?? 0
  const amountReviewer = amountTotal - amountManager - amountReferral

  const sets: { role: ProjectRole; filtered: ProjectMember[]; amount: number }[] = [
    {
      role: ProjectRole.Reviewer,
      filtered: members.filter((member) => member.role === ProjectRole.Reviewer),
      amount: amountReviewer,
    },
    {
      role: ProjectRole.Manager,
      filtered: members.filter((member) => member.role === ProjectRole.Manager),
      amount: amountManager,
    },
    {
      role: ProjectRole.Referral,
      filtered: members.filter((member) => member.role === ProjectRole.Referral),
      amount: amountReferral,
    },
  ]

  return (
    <UiStack>
      <UiGroup>
        <Group gap="xl">
          <Text size="lg" fw={700}>
            Total: {formatUsd(project.amountTotalUsd)} USDC
          </Text>
          <Group gap="xs">
            <Text size="sm">{formatUsd(project.amountTotalUsdLeft)} left</Text>
            <CoreUiProgress w={200} h={12} value={percentageLeft} tooltip={`${percentageLeft}% left`} />
          </Group>
        </Group>
        <CoreUiButton disabled={disabled} outline onClick={() => splitByRating()}>
          Split by rating
        </CoreUiButton>
      </UiGroup>

      {sets.map(({ role, filtered, amount }) => (
        <UiStack key={role}>
          <UiStack gap={0}>
            <Text size="lg" fw={700}>
              {role}
            </Text>
            <Text size="sm">{formatUsd(amount)} USDC</Text>
          </UiStack>

          {filtered
            .filter((member) => member.role === role)
            .map((member) => (
              <UiStack key={member.id}>
                {member.user ? (
                  <ManagerProjectUiPayoutItemForm
                    disabled={disabled}
                    key={member.id}
                    update={(input) => update(member.id, input)}
                    item={member}
                    user={member.user}
                  />
                ) : null}
                <CoreUiDivider />
              </UiStack>
            ))}
        </UiStack>
      ))}
    </UiStack>
  )
}
