/**
 * Calculates the estimated reading time for an article in minutes
 * @param {string} content - The article content
 * @param {number} wordsPerMinute - Average reading speed (words per minute)
 * @returns {number} - Estimated reading time in minutes
 */
exports.calculateReadTime = (content, wordsPerMinute = 225) => {
  if (!content) return 0

  // Count words in content (split by spaces and filter out empty strings)
  const words = content.split(/\s+/).filter(Boolean).length

  // Calculate reading time and round to nearest minute (minimum 1 minute)
  const readTime = Math.max(1, Math.round(words / wordsPerMinute))

  return readTime
}

/**
 * Extracts a summary from article content if none is provided
 * @param {string} content - The article content
 * @param {number} maxLength - Maximum summary length in characters
 * @returns {string} - Generated summary
 */
exports.generateSummary = (content, maxLength = 160) => {
  if (!content) return ''

  // Take the first part of the content
  let summary = content.substring(0, maxLength * 2)

  // Find a good breaking point (end of sentence or paragraph)
  const breakPoints = ['. ', '! ', '? ', '\n\n']
  let bestBreakIndex = -1

  for (const breakPoint of breakPoints) {
    const index = summary.lastIndexOf(breakPoint, maxLength)
    if (index > bestBreakIndex) {
      bestBreakIndex = index
    }
  }

  // If no good break point found, just cut at max length
  if (bestBreakIndex === -1) {
    summary = summary.substring(0, maxLength).trim()
    // Add ellipsis if we cut in the middle of the content
    if (content.length > maxLength) {
      summary += '...'
    }
  } else {
    // Cut at the break point and add the punctuation
    summary = summary.substring(0, bestBreakIndex + 1).trim()
    // Add ellipsis if we're not at the end of the content
    if (content.length > bestBreakIndex + 1) {
      summary += '..'
    }
  }

  return summary
}
