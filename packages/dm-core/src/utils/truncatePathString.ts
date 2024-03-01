export function truncatePathString(
  path: string | undefined,
  maxLength: number | undefined = 40
): string {
  if (!path) return ''
  /*
  Truncate path string to have length <= maxLength.
   */
  if (!path.includes('/') || path.length <= maxLength) {
    return path
  }
  const splitTextOnFolders: string[] = path.split('/')
  const finalName: string = splitTextOnFolders[splitTextOnFolders.length - 1]

  let truncatedPath: string = `.../${finalName}`
  let previousPath: string = ''
  let counter: number = 0
  while (truncatedPath.length <= maxLength) {
    previousPath = truncatedPath
    truncatedPath = truncatedPath.replace(
      '...',
      `.../${splitTextOnFolders[splitTextOnFolders.length - counter - 2]}`
    )
    if (truncatedPath.length >= maxLength) {
      truncatedPath = previousPath
      break
    }
    counter += 1
    if (counter > 1000) {
      // To avoid infinite loop
      break
    }
  }
  return truncatedPath
}
