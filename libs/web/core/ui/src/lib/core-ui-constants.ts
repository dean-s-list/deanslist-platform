import { CSSProperties } from '@mantine/core'

export const pinkGradient: CSSProperties = {
  background: 'linear-gradient(111.92deg, #A770EF 0%, #CF8BF3 51%, #A770EF 100%)',
}

export const pinkGradientText: CSSProperties = {
  ...pinkGradient,
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
}

export const purpleGradient: CSSProperties = {
  background: 'linear-gradient(130.23deg, #242545 0%, #100c20 50%, #370c57 100%)',
}
export const purpleGradientText: CSSProperties = {
  ...pinkGradient,
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
}

export const sidebarGradient: CSSProperties = {
  background:
    'linear-gradient(111.92deg, rgba(167, 112, 239, 0.05) 0%, rgba(207, 139, 243, 0.05) 51%, rgba(167, 112, 239, 0.05) 100%);',
}

export const cardGradient: CSSProperties = {
  background: 'linear-gradient(0deg, rgba(224, 206, 248, 0.16), rgba(224, 206, 248, 0.16))',
}
