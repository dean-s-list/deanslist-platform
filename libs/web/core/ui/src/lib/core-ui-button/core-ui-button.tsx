import { Button, ButtonProps } from '@mantine/core'
import { UiAnchor } from '@pubkey-ui/core'
import { ComponentType } from 'react'

export interface CoreUiButtonProps extends ButtonProps {
  iconLeft?: ComponentType<{ size?: number }>
  iconRight?: ComponentType<{ size?: number }>
  onClick?: () => void
  outline?: boolean
  to?: string
}

export function CoreUiButton({
  children,
  iconLeft: IconLeft,
  iconRight: IconRight,
  onClick,
  outline,
  to,
  ...props
}: CoreUiButtonProps) {
  const extraProps: ButtonProps = {
    leftSection: IconLeft ? <IconLeft size={16} /> : undefined,
    rightSection: IconRight ? <IconRight size={16} /> : undefined,
    radius: props.radius ?? 'xl',
    variant: outline ? 'outline' : undefined,
  }

  return (
    <UiAnchor to={to}>
      <Button {...extraProps} {...props} onClick={onClick}>
        {children}
      </Button>
    </UiAnchor>
  )
}
