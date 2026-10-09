/**
 * LocalStorage persistence with defensive error handling.
 *
 * Handles QuotaExceededError and private browsing storage restrictions
 * defensively by catching and logging these errors without breaking the app.
 */

/**
 * Defensive localStorage wrapper that handles QuotaExceededError and
 * SecurityError (private browsing/incognito mode) gracefully.
 *
 * @param key - The localStorage key to operate on
 * @param value - The value to save (will be stringified)
 * @returns The saved value or null if operation failed
 */
export async function saveToLocalStorage<T>(key: string, value: T): Promise<T | null> {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return value;
  } catch (error) {
    const err = error as DOMException;
    // Handle QuotaExceededError - localStorage quota reached
    if (err.name === 'QuotaExceededError') {
      console.warn(
        '[LocalStorage] QuotaExceededError: Could not save to localStorage for key "' + key + '".',
      );
      return null;
    }

    // Handle SecurityError - private browsing/incognito mode restriction
    if (err.name === 'SecurityError') {
      console.warn(
        '[LocalStorage] SecurityError: Private browsing or restricted mode prevents localStorage access for key "' +
          key +
          '".',
      );
      return null;
    }

    // Re-throw other unexpected errors
    throw error;
  }
}

/**
 * Defensive localStorage getter that handles QuotaExceededError and SecurityError.
 *
 * @param key - The localStorage key to retrieve
 * @returns The stored value or null if not found/unavailable
 */
export async function getFromLocalStorage<T>(key: string): Promise<T | null> {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    const err = error as DOMException;
    // Handle QuotaExceededError - quota exhausted during read
    if (err.name === 'QuotaExceededError') {
      console.warn(
        '[LocalStorage] QuotaExceededError: Could not read from localStorage for key "' + key + '".',
      );
      return null;
    }

    // Handle SecurityError - private browsing/incognito mode
    if (err.name === 'SecurityError') {
      console.warn(
        '[LocalStorage] SecurityError: Private browsing or restricted mode prevents localStorage read for key "' +
          key +
          '".',
      );
      return null;
    }

    // Re-throw other unexpected errors
    throw error;
  }
}

/**
 * Check if localStorage is accessible given the current context.
 * Returns true if localStorage operations are likely to succeed.
 */
export async function isLocalStorageAvailable(): Promise<boolean> {
  try {
    // Test basic localStorage availability
    await saveToLocalStorage('test-key', 'test-value');
    await getFromLocalStorage('test-key');
    return true;
  } catch (error) {
    // If we get here, localStorage is not accessible
    return false;
  }
}