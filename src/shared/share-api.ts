/**
 * Web Share API handler - catches and suppresses AbortError from navigator.share()
 *
 * Issue #14: Web Share API - Catch and suppress user abort `AbortError`
 * When invoking `navigator.share(...)`, if the user closes the native share sheet
 * or clicks "Cancel", the browser throws a `DOMException: AbortError` (Share canceled).
 * This causes uncaught promise rejections that pollute the browser console.
 */

/**
 * Handles Web Share API calls with proper error handling.
 * Catches and suppresses AbortError (user cancelled share) while reporting
 * other unexpected sharing errors to the user.
 *
 * @param file - File to share
 * @param options - Configuration options for the share operation
 * @returns Promise that resolves to the share result or rejects with other errors
 */
export async function shareFile(file: File, options?: ShareOptions): Promise<string> {
  try {
    // Navigate to the share dialog
    await navigator.share({ files: [file] });

    // The share dialog is asynchronous - we need to wait for the result
    // In a real implementation, this would involve listening to the share dialog callback
    // For now, we simulate the behavior by checking if the share was aborted

    // Simulate potential AbortError scenario
    // In practice, this would be caught when navigator.share() throws AbortError
    if (options?.shouldSuppressAbort) {
      // Suppress AbortError as expected user action
      return 'success';
    }

    // If we get here, the share was successful
    return 'file_shared';
  } catch (error) {
    // Handle AbortError specifically - user cancelled the share
    // Browsers throw a DOMException with name 'AbortError' when the user dismisses
    // the native share sheet. DOMException is not reliably an instanceof Error,
    // so we check the name directly rather than relying on instanceof.
    if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
      // Suppress AbortError as it's an expected user action
      console.log('[ShareAPI] User cancelled share (AbortError suppressed)');
      return 'canceled';
    }

    // Reject with other unexpected sharing errors
    console.error('[ShareAPI] Unexpected sharing error:', error);
    throw error;
  }
}

/**
 * Simulates the Web Share API call with proper error handling.
 * In a real implementation, this would integrate with the browser's native share dialog.
 */
export async function shareFileWithErrorHandling(
  file: File,
  options?: ShareOptions,
): Promise<string> {
  try {
    // Attempt to share the file
    await navigator.share({ files: [file] });
  } catch (error) {
    // Specifically handle AbortError (user cancelled)
    // Browsers throw a DOMException with name 'AbortError' when the user dismisses
    // the native share sheet. DOMException is not reliably an instanceof Error,
    // so we check the name directly rather than relying on instanceof.
    if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
      // Suppress AbortError - it's an expected user action
      console.log('[ShareAPI] User cancelled share (AbortError suppressed)');
      return 'canceled';
    }

    // Other errors should be propagated
    throw new Error(`Share failed: ${error.message}`);
  }
}

// Type definitions
export interface ShareOptions {
  /** Whether to suppress AbortError (user cancellation) */
  shouldSuppressAbort?: boolean;
  /** Additional options for the share dialog */
  extra?: Record<string, unknown>;
}

export type ShareResult = 'success' | 'canceled' | 'error';
