import { Dialog, DialogProps, Overlay, Title } from '@mantine/core'
import classes from "./core-ui-dialog.module.css"
import { useEffect, useRef } from 'react'

export interface CoreUiDialogProps extends DialogProps {
  title: string,
  centered?: boolean
  closeOnClickOutside?: boolean
}

export function CoreUiDialog({
  title,
  centered,
  closeOnClickOutside,
  ...props
}: CoreUiDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (closeOnClickOutside && props.onClose && dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      props.onClose()
    }
  }

  useEffect(() => {
    if (props.opened) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [props.opened]);

  let position = props.position
  let className = props.className || ""

  if (centered) {
    position = {
      top: "50%",
      left: "50%",
      ...props.position
    }
    className += classes.centered
  }

  const extraProps: DialogProps = {
    withCloseButton: props.withCloseButton || true,
    size: props.size || "lg",
    radius: props.radius || "xl",
    bg: props.bg || "#3D3A41",
    position,
    className,
    opened: props.opened,
    onClose: props.onClose,
    withinPortal: false
  }

  return (
    <Dialog ref={dialogRef} {...extraProps} {...props}>
      <Title size="h3">{title}</Title>
      {props.children}
    </Dialog>
  )
}
