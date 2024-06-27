import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CommunityUiLink } from '@deanslist-platform/web-community-ui'
import { CoreUiBackLink, CoreUiButton } from '@deanslist-platform/web-core-ui'
import { useReviewerFindOneProject } from '@deanslist-platform/web-project-data-access'
import {
  ProjectUiInstructions,
  ProjectUiItem,
  ProjectUiManagers,
  ProjectUiOverview,
  ProjectUiSocials,
  ProjectUiStatusBadge,
  ProjectUiTags,
} from '@deanslist-platform/web-project-ui'
import { ReviewerProjectReviewFeature } from '@deanslist-platform/web-review-feature'
import { Button, Collapse, Group, Paper } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiContainer, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { IconArrowsMaximize, IconArrowsMinimize, IconChairDirector } from '@tabler/icons-react'
import { Navigate, useParams, useRoutes } from 'react-router-dom'

export function ReviewerProjectDetailFeature() {
  const { user } = useAuth()
  const { projectId } = useParams<{ projectId: string }>() as { projectId: string }
  const { item, query } = useReviewerFindOneProject({ projectId })
  const [opened, { toggle }] = useDisclosure(true)

  const routes = useRoutes([
    { index: true, element: <Navigate to="reviews" replace /> },
    {
      path: '/reviews/*',
      element: <ReviewerProjectReviewFeature projectId={projectId} />,
    },
  ])

  const isManager = item?.managers?.some((manager) => manager.id === user?.id)

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
          <CoreUiBackLink label="Back to overview" />
          {isManager ? (
            <CoreUiButton variant="light" to={item.manageUrl} iconLeft={IconChairDirector}>
              Manage project
            </CoreUiButton>
          ) : null}
        </UiGroup>
        <Paper radius="xl" withBorder p="xl" bg="dark.7">
          <UiStack>
            <UiGroup>
              <Group>
                <ProjectUiItem project={item} />
              </Group>
              <Group gap="xs">
                <Group justify="center">
                  <Button
                    variant="subtle"
                    radius="xl"
                    onClick={toggle}
                    rightSection={opened ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
                  >
                    {opened ? 'Hide' : 'Show'} details
                  </Button>
                </Group>
              </Group>
            </UiGroup>
            <Collapse in={opened}>
              <UiStack>
                <Group align="center">
                  Status <ProjectUiStatusBadge status={item.status} />
                </Group>
                <Group>
                  Managers
                  <ProjectUiManagers project={item} />
                </Group>
                <Group>
                  Community
                  {item.community ? <CommunityUiLink community={item.community} to={item.community.viewUrl} /> : null}
                </Group>
                {item.tags?.length ? <ProjectUiTags tags={item.tags} /> : null}
                {item.instructions?.length ? <ProjectUiInstructions item={item} /> : null}
                <ProjectUiSocials item={item} />
                <ProjectUiOverview item={item} />
              </UiStack>
            </Collapse>
          </UiStack>
        </Paper>
        <UiStack mt="lg">{routes}</UiStack>
      </UiStack>
    </UiContainer>
  )
}
