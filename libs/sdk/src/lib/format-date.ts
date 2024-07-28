export function formatDate(date: Date | string | null) {
  if (!date) return null

  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date))
}
