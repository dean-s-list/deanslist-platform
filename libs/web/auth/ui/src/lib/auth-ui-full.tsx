import { Flex, FlexProps } from '@mantine/core'

export function AuthUiFull({ children, ...props }: FlexProps) {
  return (
    <Flex h="100vh" justify="center" align="center" direction="column" className="gradient-purple" {...props}>
      {children}
    </Flex>
  )
}
