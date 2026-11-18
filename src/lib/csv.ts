/**
 * KAIROS 2027 — CSV SANITIZATION UTILITIES
 * 
 * Protects against CSV / Spreadsheet Formula Injection (CWE-1236).
 * Prepends a single quote (') if value begins with formula triggers:
 * '=', '+', '-', '@', '\t', '\r', '%' or similar characters.
 * Escapes internal quotes and wraps in double quotes.
 */

export function sanitizeCsvCell(value: any): string {
  if (value === null || value === undefined) {
    return '""';
  }
  let str = String(value);
  const trimmed = str.trimStart();
  if (
    trimmed.startsWith('=') ||
    trimmed.startsWith('+') ||
    trimmed.startsWith('-') ||
    trimmed.startsWith('@') ||
    trimmed.startsWith('\t') ||
    trimmed.startsWith('\r') ||
    trimmed.startsWith('%')
  ) {
    str = `'${str}`;
  }
  return `"${str.replace(/"/g, '""')}"`;
}
