import { Button, ButtonProps } from '@mantine/core'
import { UiAnchor } from '@pubkey-ui/core'
import { ComponentType, MouseEventHandler } from 'react'

export interface CoreUiButtonProps extends Omit<ButtonProps, 'type'> {
  iconLeft?: ComponentType<{ size?: number }>
  iconRight?: ComponentType<{ size?: number }>
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  outline?: boolean
  to?: string
  type?: 'submit' | 'button'
}

export function CoreUiButton({
  children,
  iconLeft: IconLeft,
  iconRight: IconRight,
  onClick,
  outline,
  to,
  type = 'button',
  ...props
}: CoreUiButtonProps) {
  const defaultProps: ButtonProps = {
    leftSection: IconLeft ? <IconLeft size={16} /> : undefined,
    rightSection: IconRight ? <IconRight size={16} /> : undefined,
    radius: props.radius ?? 'xl',
    variant: outline ? 'outline' : undefined,
    style: {
      color: outline ? 'white' : undefined,
      ...props.style,
    },
  }

  return (
    <UiAnchor to={to}>
      <Button type={type} {...defaultProps} {...props} onClick={onClick}>
        {children}
      </Button>
    </UiAnchor>
  )
}
