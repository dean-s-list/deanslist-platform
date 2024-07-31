import { ManagerUpdateReviewInput, Project, Review, User } from '@deanslist-platform/sdk'
import { CoreUiButton, CoreUiDivider, CoreUiProgress } from '@deanslist-platform/web-core-ui'
import { Group, Text } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { ManagerProjectUiPayoutItemForm } from './manager-project-ui-payout-item-form'

export function ManagerProjectUiPayoutsForm({
  updateReview,
  project,
  reviews,
  splitByRating,
}: {
  splitByRating: () => Promise<boolean>
  updateReview: (reviewId: string, input: ManagerUpdateReviewInput) => Promise<boolean>
  project: Project
  reviews: Review[]
}) {
  const managers = project.managers ?? []
  const referral = project.referral ?? undefined
  const percentageLeft = ((project.amountTotalUsdLeft ?? 0) / (project.amountTotalUsd ?? 0)) * 100

  return (
    <UiStack>
      <UiGroup>
        <Group gap="xl">
          <Text size="lg" fw={700}>
            Total: {project.amountTotalUsd} USDC
          </Text>
          <Group gap="xs">
            <Text size="sm">{project.amountTotalUsdLeft} left</Text>
            <CoreUiProgress w={200} h={12} value={percentageLeft} tooltip={`${percentageLeft}% left`} />
          </Group>
        </Group>
        <CoreUiButton outline onClick={() => splitByRating()}>
          Split by rating
        </CoreUiButton>
      </UiGroup>
      {reviews.map((review) => (
        <UiStack key={review.id}>
          <ManagerProjectUiPayoutItemForm
            key={review.id}
            updateReview={(input) => updateReview(review.id, input)}
            item={review}
            user={review.projectMember?.user as User}
          />
          <CoreUiDivider />
        </UiStack>
      ))}
      {managers.length ? (
        <UiStack>
          <Text size="lg" fw={700}>
            Managers
          </Text>
          {managers.map((manager) => (
            <UiStack key={manager.id}>
              {manager.user ? (
                <ManagerProjectUiPayoutItemForm
                  key={manager.id}
                  item={{ amount: project.amountManagerUsd, bonus: 0 }}
                  user={manager.user}
                />
              ) : null}
              <CoreUiDivider />
            </UiStack>
          ))}
        </UiStack>
      ) : null}
      {referral ? (
        <UiStack>
          <Text size="lg" fw={700}>
            Referral
          </Text>
          {referral.user ? (
            <ManagerProjectUiPayoutItemForm
              item={{ amount: project.amountReferralUsd, bonus: 0 }}
              user={referral.user}
            />
          ) : null}
        </UiStack>
      ) : (
        <Text size="lg" fw={700}>
          No referral
        </Text>
      )}
    </UiStack>
  )
}
