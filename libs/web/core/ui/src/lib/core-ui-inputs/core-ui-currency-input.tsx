import { NumberInput, NumberInputProps } from '@mantine/core'

export interface CoreUiCurrencyInputProps extends NumberInputProps {
  currency?: string
}

export function CoreUiCurrencyInput({ currency = 'USDC', ...props }: CoreUiCurrencyInputProps) {
  const currencyWidth = currency.length * 16
  const defaultProps: NumberInputProps = {
    min: 0,
    rightSection: currency,
    rightSectionProps: {
      style: {
        color: 'white',
        width: currencyWidth,
      },
    },
    radius: 'md',
    styles: {
      input: {
        background: 'rgba(255, 255, 255, 0.1)',
        paddingRight: currencyWidth,
      },
    },
  }

  return <NumberInput {...defaultProps} {...props} />
}
