import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiCountdown } from '@deanslist-platform/web-core-ui'
import {
  useAnonUserIdentityMap,
  useLeaderboardPerks,
  useLeaderboardRecords,
  UserIdentityMap,
} from '@deanslist-platform/web-leaderboard-data-access'
import { LeaderboardUiLeader, LeaderboardUiPerks, LeaderboardUiTable } from '@deanslist-platform/web-leaderboard-ui'
import { SolanaClusterProvider, WalletConnectionLoader } from '@deanslist-platform/web-solana-data-access'
import { Card, Center, Divider, Grid, Stack, Table, TableTbody, Title } from '@mantine/core'
import { UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { Wallet } from '@solana/wallet-adapter-react'
import { IconListNumbers } from '@tabler/icons-react'

export function UserLeaderboardFeature() {
  const apiUrl = ''
  const { solanaRpcUrl } = useAuth()

  return (
    <SolanaClusterProvider autoConnect={true} endpoint={solanaRpcUrl}>
      <WalletConnectionLoader
        render={({ wallet, connection }) => <LeaderboardLoader apiUrl={apiUrl} wallet={wallet} />}
      />
    </SolanaClusterProvider>
  )
}

function LeaderboardLoader({ apiUrl, wallet }: { apiUrl: string; wallet: Wallet }) {
  // Here we can load fixed data for the leaderboard
  // For instance, we can fetch all the users from the database, create a map of wallet, and all the voting powers
  // We can also fetch the realm data, and the vsr client
  // All of this is passed into the LeaderboardFeature component, which can then use it to fetch the rest of the data
  const identityMapQuery = useAnonUserIdentityMap({ apiUrl })

  if (identityMapQuery.isLoading) {
    return <UiLoader />
  }

  if (!identityMapQuery.data) {
    return <UiError message="Could not fetch user identity map." />
  }

  return <LeaderboardFeature wallet={wallet} identityMap={identityMapQuery.data} apiUrl={apiUrl} />
}

function LeaderboardFeature({
  wallet,
  identityMap,
  apiUrl,
}: {
  wallet: Wallet
  identityMap: UserIdentityMap
  apiUrl: string
}) {
  const { leaders, loading, loadingMessage, error } = useLeaderboardRecords({ wallet, identityMap, apiUrl })
  const { perks, deadline } = useLeaderboardPerks()

  const me = !loading && leaders?.find((l) => l.isYou)

  return (
    <UiPage title="Leaderboard" leftAction={<IconListNumbers size={28} />}>
      <Grid>
        <Grid.Col span={7}>
          <Card radius="lg">
            <LeaderboardUiTable
              leaders={leaders}
              loading={loading}
              perks={perks}
              loadingMessage={loadingMessage}
              error={error}
            />
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
