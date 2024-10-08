import { Divider, DividerProps, TypographyStylesProvider } from '@mantine/core'
import { dividerColor } from '../core-ui-constants'
import classes from './core-ui-content.module.css'

export function CoreUiContent({ content }: { content: string }) {
  if (!content) return null
  return (
    <TypographyStylesProvider
      className={`${classes.body} core-ui-content`}
      styles={{
        root: { margin: 0, padding: 0 },
      }}
    >
      <div className={classes.content} dangerouslySetInnerHTML={{ __html: content ?? '' }} />
    </TypographyStylesProvider>
  )
}

export function CoreUiDivider(props: DividerProps) {
  return <Divider color={dividerColor} {...props} />
}
