import { CoreUiCountdown } from '@deanslist-platform/web-core-ui'
import { useLeaderboardPerks, useLeaderboardRecords } from '@deanslist-platform/web-leaderboard-data-access'
import { LeaderboardUiLeader, LeaderboardUiPerks, LeaderboardUiTable } from '@deanslist-platform/web-leaderboard-ui'
import { SolanaClusterProvider, WalletConnectionLoader } from '@deanslist-platform/web-solana-data-access'
import { Card, Center, Divider, Grid, Stack, Table, TableTbody, Title } from '@mantine/core'
import { UiPage } from '@pubkey-ui/core'
import { MAINNET_RPC } from '@realms/constants/endpoints'
import { Wallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'

export function UserLeaderboardFeature() {
  return (
    <SolanaClusterProvider autoConnect={true} endpoint={MAINNET_RPC}>
      <WalletConnectionLoader
        render={({ wallet, connection }) => <LeaderboardLoader wallet={wallet} connection={connection} />}
      />
    </SolanaClusterProvider>
  )
}

function LeaderboardLoader({ wallet, connection }: { wallet: Wallet; connection: Connection }) {
  // Here we can load fixed data for the leaderboard
  // For instance, we can fetch all the users from the database, create a map of wallet, and all the voting powers
  // We can also fetch the realm data, and the vsr client
  // All of this is passed into the LeaderboardFeature component, which can then use it to fetch the rest of the data
  return <LeaderboardFeature wallet={wallet} connection={connection} />
}

function LeaderboardFeature({ wallet, connection }: { wallet: Wallet; connection: Connection }) {
  const { leaders, loading, loadingMessage } = useLeaderboardRecords({ wallet, connection })
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
