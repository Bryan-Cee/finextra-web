export const parseAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KES',
    notation: "compact"
  }).format(amount)
}

export const parseTime = (date?: number | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  }).format(date)
}

// { dateStyle: "full" | "long" | "medium" | "short", year: 'numeric', month: 'long', day: 'numeric' }
export const parseDate = (date?: Date, options = { dateStyle: "medium" }) => {
  return new Intl.DateTimeFormat('en-GB', { ...options } as Intl.DateTimeFormatOptions).format(date)
}

export const parseDateWithSuffix = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full"
  })
    .format(date)
    .replace(/\b(\d{1,2})\b/, (match, p1) => getDayWithSuffix(date))
}

export function getDayWithSuffix(date: Date) {
  const day = date.getDate()
  const suffix = ["th", "st", "nd", "rd"];
  const relevantDigits = (day < 30) ? day % 20 : day % 30;
  const suffixIndex = (relevantDigits <= 3) ? relevantDigits : 0;
  return `${day}${suffix[suffixIndex] as string}`;
}
