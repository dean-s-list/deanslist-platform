import { NumberInput, NumberInputProps } from '@mantine/core'

export interface CoreUiCurrencyInputProps extends NumberInputProps {
  currency: string
}

function CurrencySection({ currency }: { currency: string }) {
  return <div>{currency}</div>
}

export function CoreUiCurrencyInput({ currency, ...props }: CoreUiCurrencyInputProps) {
  const currencyWidth = currency.length * 16
  const extraProps: NumberInputProps = {
    rightSection: currency,
    rightSectionProps: {
      style: {
        width: currencyWidth,
      },
    },
    styles: {
      input: {
        paddingRight: currencyWidth,
      },
    },
  }

  return <NumberInput {...extraProps} {...props} />
}
