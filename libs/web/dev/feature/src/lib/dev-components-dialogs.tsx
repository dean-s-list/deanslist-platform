import { CoreUiCheckbox, CoreUiButton, CoreUiInput, CoreUiModal } from '@deanslist-platform/web-core-ui'
import { UiCard, UiStack } from '@pubkey-ui/core'
import { useDisclosure } from '@mantine/hooks'

export function DevComponentsDialogs() {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false)

  return (
    <UiCard title="Dialog">
      <UiStack align="flex-start">
        <CoreUiButton onClick={openModal}>Open Modal</CoreUiButton>
        <CoreUiModal opened={modalOpened} title="Add custom link" onClose={closeModal}>
          <CoreUiInput label="Label" py={10} />
          <CoreUiInput label="Link" py={10} />
          <CoreUiCheckbox label="I agree" py={10} />
          <CoreUiButton onClick={closeModal} my={20} fullWidth>
            Add link
          </CoreUiButton>
        </CoreUiModal>
      </UiStack>
    </UiCard>
  )
}
