/**
 * Normalizes a movie or song title for comparison
 * Removes special characters, extra spaces, and converts to lowercase
 */
export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Remove special characters except spaces
    .replace(/[^\w\s]/g, '')
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
}

/**
 * Checks if two titles match, accounting for variations
 */
export function titlesMatch(input: string, actual: string, alternatives: string[] = []): boolean {
  const normalizedInput = normalizeTitle(input)
  const normalizedActual = normalizeTitle(actual)

  if (normalizedInput === normalizedActual) {
    return true
  }

  // Check against alternative titles
  return alternatives.some(alt => normalizeTitle(alt) === normalizedInput)
}

/**
 * Calculates similarity between two strings (Levenshtein distance)
 * Returns a value between 0 and 1, where 1 is identical
 */
export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeTitle(str1)
  const s2 = normalizeTitle(str2)

  const longer = s1.length > s2.length ? s1 : s2
  const shorter = s1.length > s2.length ? s2 : s1

  if (longer.length === 0) {
    return 1.0
  }

  const editDistance = getEditDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

/**
 * Helper function to calculate edit distance
 */
function getEditDistance(str1: string, str2: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}

/**
 * Truncates text to specified length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Capitalizes first letter of each word
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
