import { Modal, ModalProps, Title } from '@mantine/core'

export interface CoreUiModalProps extends ModalProps {
  title: string
}

export function CoreUiModal({ title, ...props }: CoreUiModalProps) {
  const defaultProps: ModalProps = {
    title: <Title size="h3">{title}</Title>,
    withCloseButton: props.withCloseButton || true,
    size: props.size || 'lg',
    radius: props.radius || 'xl',
    bg: props.bg || '#3D3A41',
    opened: props.opened,
    onClose: props.onClose,
  }

  return (
    <Modal {...defaultProps} {...props}>
      {props.children}
    </Modal>
  )
}
