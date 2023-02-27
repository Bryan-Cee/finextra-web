export const parseAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KES',
  }).format(amount)
}

export const parseTime = (date?: number | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  }).format(date)
}
export const parseDate = (date?: number | Date) => {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(date)
}
