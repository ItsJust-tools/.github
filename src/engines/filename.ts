/**
 * Sanitize generated export filenames against invalid OS characters.
 * 
 * @param filename - The filename to sanitize
 * @param fallback - Fallback filename if the result is empty
 * @returns A sanitized filename safe for use across different operating systems
 */
export function sanitizeFilename(filename: string, fallback: string = 'export'): string {
  if (!filename || typeof filename !== 'string') {
    return fallback;
  }
  
  // Remove invalid OS characters: / \ : * ? " < > | and control characters
  // Also replace whitespace sequences or trim
  let sanitized = filename
    .replace(/[\\/:*?"<>|\x00-\x1f\x80-\x9f]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Remove leading dots or trailing dots/spaces that cause issues
  sanitized = sanitized.replace(/^[.]+/, '').replace(/[.\s]+$/, '');
  
  if (!sanitized) {
    return fallback;
  }
  
  // Enforce max length of 100 characters
  if (sanitized.length > 100) {
    sanitized = sanitized.substring(0, 100).trim().replace(/[.\s]+$/, '');
  }
  
  return sanitized || fallback;
}