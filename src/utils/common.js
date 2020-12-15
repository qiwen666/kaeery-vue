export function formatContent(content) {
  return content.length > 20 ? content.slice(0, 20) + '...' : content
}