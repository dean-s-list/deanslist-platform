import { Center, ScrollArea, Stack, Table, Text } from '@mantine/core'
import { UiError, UiInfo, UiLoader } from '@pubkey-ui/core'
import React from 'react'
import { LeaderboardUiLeader } from './leaderboard-ui-leader'
import { LeaderboardLeader, LeaderboardPerk } from '@deanslist-platform/web-leaderboard-data-access'

function TableTh({ text, ta }: { text: string; ta?: string }) {
  return (
    <Table.Th ta="left">
      <Text size="xl" fw={600}>
        {text}
      </Text>
    </Table.Th>
  )
}

export function LeaderboardUiTable({
  loading,
  loadingMessage,
  leaders,
  perks,
  error,
}: {
  loading: boolean
  loadingMessage: string
  leaders: LeaderboardLeader[] | undefined
  perks: LeaderboardPerk[]
  error: string | undefined
}) {
  if (error) {
    return <UiError message={error}>{error}</UiError>
  }

  if (loading) {
    return (
      <Stack p={20}>
        <UiLoader />
        <Center>
          <Text>{loadingMessage}</Text>
        </Center>
      </Stack>
    )
  }

  if (!leaders?.length) {
    return <UiInfo message="No users under 'Dean's List Network State' DAO" />
  }

  return (
    <ScrollArea>
      <Table p="sm" verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <TableTh text="Rank" />
            <TableTh text="Member" ta="left" />
            <TableTh text="Perks" />
            <TableTh text="Governance" />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {leaders.map((item) => (
            <LeaderboardUiLeader
              key={item.rank}
              leader={item}
              perks={perks}
              onClick={() => item.twitter && window.open(item.twitter, '_blank', 'noopener,noreferrer')}
            />
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  )
}
