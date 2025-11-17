import { format, formatDistance, formatRelative, isToday, isYesterday } from 'date-fns'

/**
 * Formats a date as a relative time string
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isToday(dateObj)) {
    return 'Today'
  }

  if (isYesterday(dateObj)) {
    return 'Yesterday'
  }

  return formatDistance(dateObj, new Date(), { addSuffix: true })
}

/**
 * Formats a date in a readable format
 */
export function formatDate(date: Date | string, formatString: string = 'PPP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, formatString)
}

/**
 * Gets today's date in YYYY-MM-DD format
 */
export function getTodayString(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

/**
 * Checks if a date string is today
 */
export function isDateToday(dateString: string): boolean {
  try {
    return isToday(new Date(dateString))
  } catch {
    return false
  }
}

/**
 * Gets the start of today (midnight)
 */
export function getStartOfToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

/**
 * Gets the end of today (23:59:59)
 */
export function getEndOfToday(): Date {
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return today
}

/**
 * Formats a duration in seconds to MM:SS
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Calculates days until a specific date
 */
export function daysUntil(date: Date | string): number {
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const today = getStartOfToday()
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
