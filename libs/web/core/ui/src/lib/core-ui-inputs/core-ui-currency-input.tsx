import { NumberInput, NumberInputProps } from '@mantine/core'

export interface CoreUiCurrencyInputProps extends NumberInputProps {
  currency: string;
}

function CurrencySection({ currency }: { currency: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingRight: 35 }}>
      {currency}
    </div>
  );
}

export function CoreUiCurrencyInput({
  currency,
  ...props
}: CoreUiCurrencyInputProps) {
  const extraProps: NumberInputProps = {
    rightSection: currency && <CurrencySection currency={currency}/>,
    styles: {
      input: {
        paddingRight: currency && `${currency.length * 8 + 25}px`,
      },
    },
  }

  return (
    <NumberInput {...extraProps} {...props} />
  )
}
