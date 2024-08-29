export function formatUsd(amount: number | undefined | null) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 5,
  }).format(amount ?? 0)
}
