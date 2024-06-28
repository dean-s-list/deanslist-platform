import { ManagerUpdateProjectInput, Project } from '@deanslist-platform/sdk'
import { Button, Group, NumberInput } from '@mantine/core'
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
    <form
      onSubmit={form.onSubmit((values) =>
        submit({ ...values, duration: parseInt(values.duration?.toString() ?? '2') }),
      )}
    >
      <UiStack>
        <UiStack>
          <NumberInput
            label="Total Amount"
            placeholder="Amount of USDC managers get"
            {...form.getInputProps('amountTotalUsd')}
          />
          <NumberInput
            label="Manager Amount"
            placeholder="Amount of USDC managers get"
            {...form.getInputProps('amountManagerUsd')}
          />
          <NumberInput
            label="Referral Amount"
            placeholder="Amount of USDC the referral gets"
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
