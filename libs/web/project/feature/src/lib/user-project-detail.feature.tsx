import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useUserFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiItem, ProjectUiOverview } from '@deanslist-platform/web-project-ui'
import { UserReviewFeature } from '@deanslist-platform/web-review-feature'
import { Group } from '@mantine/core'
import { UiContainer, UiDebugModal, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { Navigate, useParams, useRoutes } from 'react-router-dom'

export function UserProjectDetailFeature() {
  const { projectId } = useParams<{ projectId: string }>() as { projectId: string }
  const { item, query } = useUserFindOneProject({ projectId })

  const routes = useRoutes([
    { index: true, element: <Navigate to="reviews" replace /> },
    {
      path: '/reviews/*',
      element: <UserReviewFeature projectId={projectId} />,
    },
  ])

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <UiContainer>
      <UiStack>
        <UiGroup>
          <Group>
            <CoreUiBack />
            <ProjectUiItem project={item} />
          </Group>
          <Group gap="xs">
            <UiDebugModal data={item} />
          </Group>
        </UiGroup>
        <UiStack>
          <ProjectUiOverview item={item} />
          {routes}
        </UiStack>
      </UiStack>
    </UiContainer>
  )
}
