/**
 * Sanitizes a file name for safe storage in Supabase Storage.
 * - Removes accents (á→a, ã→a, ç→c, etc.)
 * - Replaces spaces with underscores
 * - Removes special characters that are invalid in storage keys
 * - Keeps only letters, numbers, hyphens, underscores, and dots
 */
export function sanitizeFileName(fileName: string): string {
  // Normalize to decompose accented characters, then remove diacritics
  const normalized = fileName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // Replace spaces with underscores
  const noSpaces = normalized.replace(/\s+/g, '_');
  
  // Keep only alphanumeric, hyphens, underscores, and dots
  const sanitized = noSpaces.replace(/[^a-zA-Z0-9._-]/g, '');
  
  // Ensure we don't have multiple consecutive underscores or dots
  const cleaned = sanitized.replace(/[_.]{2,}/g, '_');
  
  // Ensure it doesn't start or end with special characters
  return cleaned.replace(/^[._-]+|[._-]+$/g, '') || 'file';
}

/**
 * Validates file size and returns an error message if too large.
 * @param file The file to validate
 * @param maxSizeMB Maximum size in megabytes
 * @returns Error message or null if valid
 */
export function validateFileSize(file: File, maxSizeMB: number = 50): string | null {
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return `Arquivo muito grande (${fileSizeMB}MB). O limite é ${maxSizeMB}MB.`;
  }
  return null;
}
