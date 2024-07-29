import { Rating, RatingProps, Tooltip } from '@mantine/core'

export interface CoreUiRatingProps extends Omit<RatingProps, 'value'> {
  value?: number | undefined | null
  tooltip?: string
}

export function CoreUiRating({ value, tooltip, ...props }: CoreUiRatingProps) {
  const element = <Rating fractions={2} size="sm" value={value ?? 0} {...props} />

  return tooltip ? (
    <Tooltip label={tooltip} withArrow position="top">
      {element}
    </Tooltip>
  ) : (
    element
  )
}
