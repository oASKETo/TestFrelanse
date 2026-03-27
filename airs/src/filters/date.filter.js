export default function dateFilter(value, format = 'date', locale = 'ru-RU') {
  if (!value) return ''

  format = format || 'date'

  const date = new Date(value)
  if (isNaN(date.getTime())) return ''

  const options = {}

  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }

  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  return new Intl.DateTimeFormat(locale, options).format(date)
}