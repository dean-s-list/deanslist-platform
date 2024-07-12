import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiBackLink, CoreUiButton, CoreUiCard } from '@deanslist-platform/web-core-ui'
import { useReviewerFindOneProject } from '@deanslist-platform/web-project-data-access'
import {
  ProjectUiInstructions,
  ProjectUiItem,
  ProjectUiManagers,
  ProjectUiSocials,
  ProjectUiStatusBadge,
  ProjectUiTags,
} from '@deanslist-platform/web-project-ui'
import { ReviewerProjectReviewFeature } from '@deanslist-platform/web-review-feature'
import { Button, Collapse, Group } from '@mantine/core'
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

        <CoreUiCard>
          <UiStack>
            <UiGroup>
              <Group>
                <ProjectUiItem project={item} />
                {item.tags?.length ? <ProjectUiTags tags={item.tags} /> : null}
              </Group>
              <Group gap="xs">
                <Group justify="center">
                  <Group align="center">
                    <ProjectUiStatusBadge status={item.status} />
                  </Group>
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
                <Group>
                  Managed by
                  <ProjectUiManagers project={item} />
                </Group>

                {item.instructions?.length ? <ProjectUiInstructions item={item} /> : null}
                <ProjectUiSocials item={item} />
              </UiStack>
            </Collapse>
          </UiStack>
          <UiStack mt="lg">{routes}</UiStack>
        </CoreUiCard>
      </UiStack>
    </UiContainer>
  )
}
