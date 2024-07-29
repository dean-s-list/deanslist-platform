import { Progress, ProgressProps, Tooltip } from '@mantine/core'

export interface CoreUiProgressProps extends Omit<ProgressProps, 'value'> {
  value?: number | undefined | null
  tooltip?: string
}

export function CoreUiProgress({ value: input, tooltip, ...props }: CoreUiProgressProps) {
  const value = input ?? 0
  const color = value < 0 ? 'red' : 'green'
  const displayValue = value < 0 ? value * -1 : value

  const element = <Progress value={displayValue} size="lg" radius="xl" color={color} {...props} />

  return tooltip ? (
    <Tooltip label={tooltip} withArrow position="top">
      {element}
    </Tooltip>
  ) : (
    element
  )
}
