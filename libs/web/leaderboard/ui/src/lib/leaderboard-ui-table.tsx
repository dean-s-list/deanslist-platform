import { Table, Text } from '@mantine/core'
import { UiInfo, UiLoader } from '@pubkey-ui/core'
import React from 'react'
import { LeaderboardLeader, LeaderboardPerk } from '@deanslist-platform/web-leaderboard-data-access'
import { LeaderboardUiLeader } from './leaderboard-ui-leader'

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
  leaders,
  perks,
}: {
  loading: boolean
  leaders: LeaderboardLeader[] | undefined
  perks: LeaderboardPerk[]
}) {
  if (loading) {
    return <UiLoader />
  }

  if (!leaders?.length) {
    return <UiInfo message="No users under 'Dean's List Network State' DAO" />
  }

  return (
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
          <LeaderboardUiLeader leader={item} perks={perks} />
        ))}
      </Table.Tbody>
    </Table>
  )
}
