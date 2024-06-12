import { Modal, ModalProps, Text, Title } from '@mantine/core'


export interface CoreUiModalProps extends ModalProps {
  title: string
}

export function CoreUiModal({
  title,
  ...props
}: CoreUiModalProps) {
  const extraProps: ModalProps = {
    title: <Title size="h3">{title}</Title>,
    withCloseButton: props.withCloseButton || true,
    size: props.size || "lg",
    radius: props.radius || "xl",
    bg: props.bg || "#3D3A41",
    opened: props.opened,
    onClose: props.onClose,
  }

  return <Modal {...extraProps} {...props}>{props.children}</Modal>
}
