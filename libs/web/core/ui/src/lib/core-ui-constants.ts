import { CSSProperties, ModalBaseStylesNames } from '@mantine/core'

export const pinkGradient: CSSProperties = {
  background: 'linear-gradient(111.92deg, #A770EF 0%, #CF8BF3 51%, #A770EF 100%)',
}

export const pinkGradientText: CSSProperties = {
  ...pinkGradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export const purpleGradient: CSSProperties = {
  background: 'linear-gradient(130.23deg, #242545 0%, #100c20 50%, #370c57 100%)',
}

export const cardGradient: CSSProperties = {
  background: 'linear-gradient(0deg, rgba(224, 206, 248, 0.16), rgba(224, 206, 248, 0.16))',
}

export const dropdownBackground: CSSProperties = {
  background: 'rgba(61, 58, 65, 1)',
}
export const dividerColor = 'rgba(224, 206, 248, 0.16)'

export const modalStyles: Partial<Record<ModalBaseStylesNames, CSSProperties>> = {
  content: { ...dropdownBackground },
  header: { background: 'transparent' },
  title: { fontWeight: 800 },
  root: { ...dropdownBackground },
}
