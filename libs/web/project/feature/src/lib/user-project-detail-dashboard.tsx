import { useUserFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiOverview } from '@deanslist-platform/web-project-ui'
import { Grid } from '@mantine/core'
import { UiCard, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { UserProjectUserReview } from './user-project-user-review'

export function UserProjectDetailDashboard({ projectId }: { projectId: string }) {
  const { item, query } = useUserFindOneProject({ projectId })

  return query.isLoading ? (
    <UiLoader />
  ) : item ? (
    <UiStack>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <UiCard title="Project Details">
            <ProjectUiOverview item={item} />
          </UiCard>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <UserProjectUserReview projectId={projectId} />
        </Grid.Col>
      </Grid>
    </UiStack>
  ) : (
    <UiInfo message="No channels found." />
  )
}
