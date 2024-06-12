import { Button, ButtonProps } from '@mantine/core'
import { ComponentType } from 'react'

export interface CoreUiButtonProps extends ButtonProps {
  outline?: boolean
  iconLeft?: ComponentType<{ size?: number }>
  iconRight?: ComponentType<{ size?: number }>
  onClick?: () => void
}

export function CoreUiButton({
  iconLeft: IconLeft,
  iconRight: IconRight,
  outline,
  children,
  onClick,
  ...props
}: CoreUiButtonProps) {
  const extraProps: ButtonProps = {
    leftSection: IconLeft ? <IconLeft size={16} /> : undefined,
    rightSection: IconRight ? <IconRight size={16} /> : undefined,
    radius: props.radius ?? 'xl',
    variant: outline ? 'outline' : undefined,
  }

  return (
    <Button {...extraProps} {...props} onClick={onClick}>
      {children}
    </Button>
  )
}
