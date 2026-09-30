"use client";

/**
 * Clipboard utility with graceful fallbacks for insecure origins and permission rejections.
 * 
 * This implementation provides fallback mechanisms for Clipboard API when:
 * - The tool is loaded in an unauthenticated iframe
 * - Running over HTTP (in local staging)  
 * - Browser clipboard permissions are denied by policy
 * 
 * The primary method uses navigator.clipboard.writeText() for modern browsers,
 * with fallback to document.execCommand("copy") for older browsers or restricted environments.
 */

/**
 * Copy text to clipboard with graceful fallback for insecure origins and permission rejections.
 * 
 * @param text - The text to copy to clipboard
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  // Try the modern Clipboard API first
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (clipboardError) {
      // Clipboard API failed - proceed to fallback
      console.warn('[ClipboardUtils] Clipboard API failed:', clipboardError);
      return await copyTextWithFallback(text);
    }
  }
  
  // Fallback for browsers without Clipboard API
  return await copyTextWithFallback(text);
}

/**
 * Fallback implementation using document.execCommand("copy") with off-screen textarea.
 * 
 * This method works in older browsers and in environments where Clipboard API is restricted
 * (like HTTP origins, unauthenticated iframes, or when permissions are denied).
 * 
 * @param text - The text to copy
 * @returns Promise that resolves to true if successful, false otherwise
 */
async function copyTextWithFallback(text: string): Promise<boolean> {
  try {
    // Check if document.execCommand is available
    if (!document?.execCommand) {
      console.warn('[ClipboardUtils] document.execCommand not available');
      return false;
    }
    
    // Create off-screen textarea
    const textArea = document.createElement('textarea');
    
    // Set properties for reliable copy operation
    textArea.value = text;
    textArea.style.position = 'absolute';
    textArea.style.left = '-999999px';
    textArea.style.top = '0';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    textArea.style.zIndex = '-1000';
    
    // Add to DOM temporarily
    document.body.appendChild(textArea);
    
    try {
      // Select the text content
      textArea.select();
      
      // Execute copy command
      const success = document.execCommand('copy');
      return success;
    } catch (copyError) {
      console.warn('[ClipboardUtils] document.execCommand("copy") failed:', copyError);
      return false;
    } finally {
      // Clean up - remove textarea from DOM
      if (document.body.contains(textArea)) {
        document.body.removeChild(textArea);
      }
    }
  } catch (error) {
    console.error('[ClipboardUtils] Unexpected error in copyTextWithFallback:', error);
    return false;
  }
}

/**
 * Check if clipboard operations are likely to succeed in the current environment.
 * 
 * This can be used to inform UI decisions (like whether to show clipboard buttons).
 * 
 * @returns Promise that resolves to true if clipboard operations are likely to work
 */
export async function isClipboardAvailable(): Promise<boolean> {
  // Check modern Clipboard API
  if (navigator.clipboard?.writeText) {
    try {
      // Try a simple operation to test availability
      await navigator.clipboard.writeText('');
      return true;
    } catch {
      // Clipboard API exists but might be restricted
      // Check if we're in a potentially restricted environment
      const isSecureContext = window.isSecureContext;
      const isHTTPS = window.location.protocol === 'https:';
      
      // If we're not in a secure context, try the fallback
      return isSecureContext && isHTTPS;
    }
  }
  
  // Fallback to document.execCommand check
  return typeof document?.execCommand === 'function';
}