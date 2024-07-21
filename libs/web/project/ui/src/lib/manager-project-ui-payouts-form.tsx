import { ManagerUpdateProjectInput, Project } from '@deanslist-platform/sdk'
import { CoreUiCurrencyInput } from '@deanslist-platform/web-core-ui'
import { Button, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'

export function ManagerProjectUiPayoutsForm({
  submit,
  project,
}: {
  submit: (res: ManagerUpdateProjectInput) => Promise<boolean>
  project: Project
}) {
  const form = useForm<ManagerUpdateProjectInput>({
    initialValues: {
      amountManagerUsd: project.amountManagerUsd ?? 0,
      amountReferralUsd: project.amountReferralUsd ?? 0,
      amountTotalUsd: project.amountTotalUsd ?? 0,
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <UiStack>
          <CoreUiCurrencyInput
            label="Total Amount"
            description="Total amount of USDC to be rewarded in this project"
            {...form.getInputProps('amountTotalUsd')}
          />
          <CoreUiCurrencyInput
            label="Manager Amount"
            description="Amount of USDC managers get"
            {...form.getInputProps('amountManagerUsd')}
          />
          <CoreUiCurrencyInput
            label="Referral Amount"
            description="Amount of USDC the referral gets"
            {...form.getInputProps('amountReferralUsd')}
          />
        </UiStack>
        <Group justify="flex-end" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
