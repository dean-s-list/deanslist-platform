import { ManagerCommentFeature } from '@deanslist-platform/web-comment-feature'
import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ManagerProjectReviewFeature } from '@deanslist-platform/web-review-feature'
import { SimpleGrid } from '@mantine/core'
import { UiError, UiLoader } from '@pubkey-ui/core'
import { useRoutes } from 'react-router-dom'

export function ManagerProjectDetailRatingsTab({ projectId }: { projectId: string }) {
  const { item, query } = useManagerFindOneProject({ projectId })

  const routes = useRoutes([{ path: '*', element: <ManagerProjectReviewFeature projectId={projectId} /> }])
  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <SimpleGrid cols={{ base: 1, lg: 2 }}>
      <ManagerCommentFeature projectId={projectId} />
      {routes}
    </SimpleGrid>
  )
}
