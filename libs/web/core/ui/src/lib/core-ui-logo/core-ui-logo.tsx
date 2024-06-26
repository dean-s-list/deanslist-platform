import { Image } from '@mantine/core'
import { CoreUiLogoTypeProps } from './core-ui-logo-type'

export function CoreUiLogo({ height, src = '/assets/icon.png', ...props }: CoreUiLogoTypeProps = {}) {
  return <Image src={src} h={height} {...props} />
}
