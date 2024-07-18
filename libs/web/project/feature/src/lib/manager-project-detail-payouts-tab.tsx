import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ManagerProjectUiPayoutsForm } from '@deanslist-platform/web-project-ui'
import { SimpleGrid } from '@mantine/core'
import { UiError, UiLoader } from '@pubkey-ui/core'

export function ManagerProjectDetailPayoutsTab({ projectId }: { projectId: string }) {
  const { item, query, updateProject } = useManagerFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <ManagerProjectUiPayoutsForm project={item} submit={updateProject} />
    </SimpleGrid>
  )
}
