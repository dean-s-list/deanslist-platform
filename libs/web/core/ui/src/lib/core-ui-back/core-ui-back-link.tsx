import { Button, ButtonProps } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function CoreUiBackLink({
  label = 'Back',
  to = '../',
  ...props
}: ButtonProps & { label?: string; to?: string }) {
  return (
    <Button
      color="gray"
      size="sm"
      variant="transparent"
      component={Link}
      to={to}
      leftSection={<IconArrowLeft size={16} />}
      {...props}
    >
      {label}
    </Button>
  )
}
