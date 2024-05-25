import { Button, ButtonProps } from '@mantine/core'
import { useState } from 'react'

export function DiscordUiChannelCreateButton({
  refresh,
  submit,
  ...props
}: ButtonProps & {
  refresh: () => void
  submit: () => Promise<void>
}) {
  const [loading, setLoading] = useState(false)
  return (
    <Button
      onClick={() => {
        setLoading(true)
        submit().then(() => {
          setLoading(false)
          refresh()
        })
      }}
      loading={loading}
      {...props}
    >
      Set up channel
    </Button>
  )
}
