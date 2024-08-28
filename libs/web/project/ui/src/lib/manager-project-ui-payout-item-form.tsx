import { ManagerUpdateProjectMemberInput, MaybeNumber, ProjectMember, User } from '@deanslist-platform/sdk'
import { CoreUiCurrencyInput, CoreUiRating } from '@deanslist-platform/web-core-ui'
import { UserUiItem } from '@deanslist-platform/web-user-ui'
import { Group } from '@mantine/core'
import { useForm } from '@mantine/form'

export function ManagerProjectUiPayoutItemForm({
  disabled,
  update,
  item,
  user,
}: {
  disabled?: boolean
  update?: (input: ManagerUpdateProjectMemberInput) => Promise<boolean>
  item: ProjectMember & { amount?: MaybeNumber; bonus?: MaybeNumber; ratingAverage?: MaybeNumber }
  user: User
}) {
  const ratingAverage = item.review?.ratingAverage ?? 0
  const amount = item.amount ?? 0
  const bonus = item.bonus ?? 0
  const disabledForm = disabled || !update
  const form = useForm<ManagerUpdateProjectMemberInput>({
    initialValues: {
      amount,
      bonus,
    },
    onValuesChange: (values) => submit(values),
  })

  async function submit(values: ManagerUpdateProjectMemberInput) {
    if (!update) {
      return
    }
    await update({
      ...values,
      amount: values.amount ? parseInt(values.amount.toString()) : 0,
      bonus: values.bonus ? parseInt(values.bonus.toString()) : 0,
    })
  }

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <Group align="start">
        <Group miw={200} wrap="nowrap" pt={4}>
          <UserUiItem
            avatarProps={{ size: 'md' }}
            textProps={{ fw: 700, size: 'lg' }}
            user={user}
            label={
              ratingAverage ? (
                <CoreUiRating tooltip={`Rating average ${ratingAverage}`} size="md" readOnly value={ratingAverage} />
              ) : null
            }
          />
        </Group>
        <Group>
          <CoreUiCurrencyInput readOnly={disabledForm} min={0} label="Amount" {...form.getInputProps('amount')} />
          <CoreUiCurrencyInput readOnly={disabledForm} min={0} label="Bonus" {...form.getInputProps('bonus')} />
        </Group>
      </Group>
    </form>
  )
}
