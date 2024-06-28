import { Card, Center, Divider, Grid, Stack, Table, TableTbody, Title } from '@mantine/core'
import { UiPage } from '@pubkey-ui/core'
import { SolanaClusterProvider } from '@deanslist-platform/web-solana-data-access'
import React from 'react'
import { useLeaderboardPerks, useLeaderboardRecords } from '@deanslist-platform/web-leaderboard-data-access'
import { LeaderboardUiLeader, LeaderboardUiPerks, LeaderboardUiTable } from '@deanslist-platform/web-leaderboard-ui'
import { CoreUiCountdown } from '@deanslist-platform/web-core-ui'

export function UserLeaderboardFeature() {
  return (
    <SolanaClusterProvider autoConnect={true}>
      <_UserLeaderboardFeature />
    </SolanaClusterProvider>
  )
}

function _UserLeaderboardFeature() {
  const { leaders, loading, loadingMessage } = useLeaderboardRecords()
  const { perks, deadline } = useLeaderboardPerks()

  const me = !loading && leaders?.find((l) => l.isYou)

  return (
    <UiPage title="">
      <Title>Governance Leaderboard</Title>
      <Grid>
        <Grid.Col span={7}>
          <Card radius="lg">
            <LeaderboardUiTable leaders={leaders} loading={loading} perks={perks} loadingMessage={loadingMessage} />
          </Card>
        </Grid.Col>
        <Grid.Col span={5}>
          <Card radius="lg" pos="sticky" top="60px">
            <Stack w="100%">
              <Center pb={14}>
                <Title order={2}>Package Proposals</Title>
              </Center>
              <Divider />
              <Stack>
                <Center>
                  <Title order={1}>Deadline</Title>
                </Center>
                <Center>
                  <CoreUiCountdown date={deadline} textProps={{ size: '25px' }} />
                </Center>
              </Stack>
              {me && <Divider />}
              {me && (
                <Table>
                  <TableTbody>
                    <LeaderboardUiLeader leader={me} perks={perks} />
                  </TableTbody>
                </Table>
              )}
              <Divider />
              <LeaderboardUiPerks perks={perks} />
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </UiPage>
  )
}
