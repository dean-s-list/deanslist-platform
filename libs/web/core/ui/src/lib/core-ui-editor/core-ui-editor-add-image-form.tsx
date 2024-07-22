import { Stack } from '@mantine/core'
import { useState } from 'react'
import { CoreUiButton } from '../core-ui-button'
import { CoreUiInput } from '../core-ui-inputs'

export function CoreUiEditorAddImageForm({ close }: { close: (url: string) => void }) {
  const [url, setUrl] = useState('')
  return (
    <Stack>
      <CoreUiInput
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        label="URL to image"
        placeholder="Enter the URL to the image"
        data-autofocus
      />
      <CoreUiButton fullWidth onClick={() => close(url)} mt="md">
        Add image
      </CoreUiButton>
    </Stack>
  )
}
