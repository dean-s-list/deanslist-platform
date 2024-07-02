import { Avatar, Box, Group, Table, Text } from '@mantine/core'
import React from 'react'
import { LeaderboardLeader, LeaderboardPerk } from '@deanslist-platform/web-leaderboard-data-access'
import { CoreUiBignumber } from '@deanslist-platform/web-core-ui'
import { IconBrandX } from '@tabler/icons-react'

export function LeaderboardUiLeader({
  leader,
  perks,
  onClick,
}: {
  leader: LeaderboardLeader
  perks: LeaderboardPerk[]
  onClick: () => void
}) {
  const leaderPerks = perks.filter((perk) => leader.rank <= perk.top).sort((a, b) => a.top - b.top)

  return (
    <Table.Tr
      key={leader.wallet}
      bg={leader.isYou ? 'green.9' : ''}
      c={leaderPerks[0]?.color}
      onClick={() => onClick()}
    >
      <Table.Td w={10} align="center">
        {leader.rank}.
      </Table.Td>
      <Table.Td>
        <Group wrap="nowrap">
          <Avatar src={leader.avatarUrl} radius="xl" size={45} />
          <Text>
            {leader.name} {leader.isYou && '(me)'}
          </Text>
          {leader.twitter && (
            <Box bg="black" pt={5} px={5} style={{ borderRadius: 5 }}>
              <IconBrandX color="white" />
            </Box>
          )}
        </Group>
      </Table.Td>
      <Table.Td>
        <Group>
          {leaderPerks.map((p, i) => (
            <Text key={i} size="xl">
              {p.icon}
            </Text>
          ))}
        </Group>
      </Table.Td>
      <Table.Td w={100}>
        <CoreUiBignumber bn={leader.votingPower} />
      </Table.Td>
    </Table.Tr>
  )
}
