import { useAuth } from '@deanslist-platform/web-auth-data-access'
import {
  CoreUiBackLink,
  CoreUiButton,
  CoreUiCard,
  CoreUiDebugModal,
  CoreUiDivider,
} from '@deanslist-platform/web-core-ui'
import { useReviewerFindOneProject } from '@deanslist-platform/web-project-data-access'
import {
  ProjectUiAmount,
  ProjectUiDates,
  ProjectUiDeadline,
  ProjectUiInstructions,
  ProjectUiItem,
  ProjectUiManagers,
  ProjectUiParticipants,
  ProjectUiSocials,
  ProjectUiStatusBadge,
} from '@deanslist-platform/web-project-ui'
import { ReviewerProjectReviewFeature } from '@deanslist-platform/web-review-feature'
import { Button, Collapse, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiContainer, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { IconArrowsMaximize, IconArrowsMinimize, IconChairDirector } from '@tabler/icons-react'
import React from 'react'
import { Navigate, useParams, useRoutes } from 'react-router-dom'

export function ReviewerProjectDetailFeature() {
  const { user, isAdmin } = useAuth()
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

  const isManager = item?.managers?.some((manager) => manager.userId === user?.id)

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
            <CoreUiBackLink label="Back to overview" />
            <CoreUiDebugModal data={item} />
          </Group>
          {isAdmin || isManager ? (
            <CoreUiButton variant="light" to={item.manageUrl} iconLeft={IconChairDirector}>
              Manage project
            </CoreUiButton>
          ) : null}
        </UiGroup>

        <CoreUiCard>
          <UiStack>
            <UiGroup>
              <Group>
                <ProjectUiItem project={item}>
                  <Group gap="xs">
                    <ProjectUiStatusBadge size="xs" status={item.status} />
                    <ProjectUiDates project={item} />
                  </Group>
                </ProjectUiItem>
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
                <Group>
                  Managed by
                  <ProjectUiManagers project={item} />
                </Group>

                {item.instructions?.length ? <ProjectUiInstructions item={item} /> : null}
                <ProjectUiSocials item={item} />
                <CoreUiDivider />
                <Group justify="space-between">
                  <Group>
                    <ProjectUiDeadline project={item} />
                    <ProjectUiParticipants project={item} />
                  </Group>
                  <ProjectUiAmount amount={item.amountTotalUsd} label="total" />
                </Group>
                <CoreUiDivider />
              </UiStack>
            </Collapse>
          </UiStack>
          <UiStack mt="lg">{routes}</UiStack>
        </CoreUiCard>
      </UiStack>
    </UiContainer>
  )
}
