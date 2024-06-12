import { CoreUiCheckbox, CoreUiButton, CoreUiInput, CoreUiModal, CoreUiDialog } from '@deanslist-platform/web-core-ui'
import { UiCard, UiStack } from '@pubkey-ui/core'
import { useDisclosure } from '@mantine/hooks'

export function DevComponentsDialogs() {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false)
  const [dialogOpened, { open: openDialog, close: closeDialog }] = useDisclosure(false)

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
        <CoreUiButton onClick={openDialog}>Open Dialog</CoreUiButton>
        <CoreUiDialog centered closeOnClickOutside opened={dialogOpened} title="Add custom link" onClose={closeDialog}>
          <CoreUiInput label="Label" py={10} />
          <CoreUiInput label="Link" py={10} />
          <CoreUiCheckbox label="I agree" py={10} />
          <CoreUiButton onClick={closeDialog} my={20} fullWidth>
            Add link
          </CoreUiButton>
        </CoreUiDialog>
      </UiStack>
    </UiCard>
  )
}
