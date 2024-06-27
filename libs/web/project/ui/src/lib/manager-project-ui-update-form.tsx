import { getEnumOptions, ManagerUpdateProjectInput, Project, ProjectStatus, type User } from '@deanslist-platform/sdk'
import { AdminUserUiSearch, UserUiItem } from '@deanslist-platform/web-user-ui'
import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  NumberInput,
  Select,
  Table,
  TagsInput,
  Textarea,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { toastError, toastSuccess, UiStack } from '@pubkey-ui/core'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'

export function ManagerProjectUiUpdateForm({
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
      avatarUrl: project.avatarUrl ?? '',
      duration: project.duration ?? 2,
      instructions: project.instructions ?? '',
      linkDiscord: project.linkDiscord ?? '',
      linkGithub: project.linkGithub ?? '',
      links: project.links ?? [],
      linkTelegram: project.linkTelegram ?? '',
      linkTwitter: project.linkTwitter ?? '',
      linkWebsite: project.linkWebsite ?? '',
      name: project.name ?? '',
      startDate: project.startDate,
      status: project.status ?? ProjectStatus.Draft,
      tags: project.tags ?? [],
    },

    validate: {
      name: (value) => {
        if (!value) return 'Name is required.'
        if (value.length < 3) return 'Name must be at least 3 characters.'
        if (value.length > 100) return 'Name must be less than 100 characters.'
      },
      avatarUrl: (value) => {
        if (value && !value.startsWith('http')) return 'Avatar URL must be a valid URL.'
      },
      duration: (value) => {
        if (value && value < 1) return 'Duration must be at least 1 week.'
      },
      startDate: (value) => {
        if (value && new Date(value) < new Date()) return 'Start date must be in the future.'
      },
    },
  })

  return (
    <UiStack>
      <form
        onSubmit={form.onSubmit((values) =>
          submit({ ...values, duration: parseInt(values.duration?.toString() ?? '2') }),
        )}
      >
        <UiStack>
          <Fieldset legend="General information">
            <UiStack>
              <TextInput
                withAsterisk
                label="Slug"
                description="The slug is a unique identifier for the project and cannot be changed."
                disabled
                defaultValue={project.slug}
              />
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Name"
                description="The name of the project must be unique within the team."
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Avatar URL"
                placeholder="Avatar URL"
                description="The URL of the project's avatar image. Leave blank to use the default avatar."
                {...form.getInputProps('avatarUrl')}
              />
              <TagsInput
                maxTags={2}
                label="Tags"
                placeholder="Tags"
                description="Tags are used to categorize projects. You can use up to 2 tags."
                {...form.getInputProps('tags')}
              />
              <Select
                label="Status"
                placeholder="Status"
                data={[...getEnumOptions(ProjectStatus)]}
                {...form.getInputProps('status')}
              />

              <Textarea
                withAsterisk
                label="Instructions"
                placeholder="Write instructions for the project. You can use markdown."
                description="The instructions for the project."
                {...form.getInputProps('instructions')}
              />
            </UiStack>
          </Fieldset>

          <Fieldset legend="Timeline">
            <UiStack>
              <TextInput
                label="Duration"
                type="number"
                placeholder="Duration"
                description="The duration of the project in weeks."
                {...form.getInputProps('duration')}
              />
              <DateInput
                label="Start Date"
                placeholder="Start Date"
                description="The start date of the project."
                {...form.getInputProps('startDate')}
              />
            </UiStack>
          </Fieldset>

          <Fieldset legend="Amounts">
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
          </Fieldset>
          <Fieldset legend="Links">
            <UiStack>
              <TextInput label="Discord" placeholder="Discord link" {...form.getInputProps('linkDiscord')} />
              <TextInput label="Github" placeholder="Github link" {...form.getInputProps('linkGithub')} />
              <TextInput label="Telegram" placeholder="Telegram link" {...form.getInputProps('linkTelegram')} />
              <TextInput label="Twitter" placeholder="Twitter link" {...form.getInputProps('linkTwitter')} />
              <TextInput label="Website" placeholder="Website link" {...form.getInputProps('linkWebsite')} />
            </UiStack>
          </Fieldset>
          <Group justify="flex-end" mt="md">
            <Button type="submit">Save</Button>
          </Group>
        </UiStack>
      </form>
    </UiStack>
  )
}

export function ProjectUiMemberTable(props: {
  users: User[]
  delete: (userId: string) => Promise<boolean | null | undefined>
}) {
  if (!props.users?.length) {
    return null
  }
  return (
    <Table>
      <Table.Tbody>
        {props.users?.map((user) => (
          <Table.Tr key={user.id}>
            <Table.Td>
              <UserUiItem user={user} />
            </Table.Td>
            <Table.Td align="right">
              <ActionIcon
                color="red"
                variant="light"
                size="sm"
                onClick={() => {
                  if (!window.confirm('Are you sure?')) return
                  return props.delete(user.id)
                }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export function ProjectUiMemberManager({
  users,
  addUser,
  removeUser,
}: {
  users: User[]
  addUser: (managerUserId: string) => Promise<boolean | null | undefined>
  removeUser: (managerUserId: string) => Promise<boolean | null | undefined>
}) {
  const [user, setUser] = useState<User | undefined>(undefined)

  return (
    <UiStack>
      <ProjectUiMemberTable users={users} delete={removeUser} />
      <AdminUserUiSearch select={setUser} />
      {user ? (
        <UnstyledButton
          onClick={() => {
            console.log(user)
            addUser(user.id)
              .then(() => {
                toastSuccess('Manager added')
              })
              .catch((err) => {
                toastError(err.message)
              })
          }}
        >
          <UserUiItem user={user} />
        </UnstyledButton>
      ) : null}
    </UiStack>
  )
}
