import { Anchor, Group, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { LeaderboardPerk } from '@deanslist-platform/web-leaderboard-data-access'

export function LeaderboardUiPerks({ perks }: { perks: LeaderboardPerk[] }) {
  return (
    <Stack py="lg">
      <Title order={3} fw={600}>
        Perks for top governance holders:
      </Title>
      {perks.map((p, i) => (
        <LeaderboardUiPerk key={i} perk={p} />
      ))}
      <Group justify="flex-end">
        <Anchor
          href="https://futarchy.metadao.fi/deans-list-dao/proposals/DgXa6gy7nAFFWe8VDkiReQYhqe1JSYQCJWUBV8Mm6aM"
          c="gray.6"
          target="_blank"
          pt={10}
        >
          *Learn More...
        </Anchor>
      </Group>
    </Stack>
  )
}

export function LeaderboardUiPerk({ perk }: { perk: LeaderboardPerk }) {
  return (
    <Group gap="sm">
      <Text size="xl">{perk.icon}</Text>
      <Text c={perk.color}>TOP {perk.top}:</Text>
      <Text>{perk.perk}</Text>
    </Group>
  )
}
