// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

/**
 * Storage wrapper that adds 'cc3_' prefix to all localStorage keys.
 * This prevents collisions with CC2 dashboard data when both apps run on the same domain.
 */

const STORAGE_PREFIX = 'cc3_';

// CRITICAL: Store reference to the ORIGINAL localStorage before we replace it
// This prevents infinite recursion when wrappedLocalStorage calls these functions
const originalLocalStorage =
  typeof window !== 'undefined' ? window.localStorage : null;

/**
 * Get item from localStorage with cc3_ prefix
 */
export const getLocalStorageItem = (key: string): string | null => {
  return originalLocalStorage?.getItem(STORAGE_PREFIX + key) ?? null;
};

/**
 * Set item in localStorage with cc3_ prefix
 */
export const setLocalStorageItem = (key: string, value: string): void => {
  originalLocalStorage?.setItem(STORAGE_PREFIX + key, value);
};

/**
 * Remove item from localStorage with cc3_ prefix
 */
export const removeLocalStorageItem = (key: string): void => {
  originalLocalStorage?.removeItem(STORAGE_PREFIX + key);
};

/**
 * Clear all CC3-prefixed items from localStorage
 * This only removes items with the cc3_ prefix, leaving CC2 data intact
 */
export const clearLocalStorage = (): void => {
  if (!originalLocalStorage) return;

  const keysToRemove: string[] = [];

  // Find all keys with our prefix
  for (let i = 0; i < originalLocalStorage.length; i++) {
    const key = originalLocalStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(key);
    }
  }

  // Remove them
  keysToRemove.forEach((key) => originalLocalStorage.removeItem(key));
};

/**
 * Check if a key exists in localStorage (with cc3_ prefix)
 */
export const hasLocalStorageItem = (key: string): boolean => {
  return originalLocalStorage?.getItem(STORAGE_PREFIX + key) !== null;
};

/**
 * Get all CC3 storage keys (without prefix)
 */
export const getAllLocalStorageKeys = (): string[] => {
  if (!originalLocalStorage) return [];

  const keys: string[] = [];

  for (let i = 0; i < originalLocalStorage.length; i++) {
    const key = originalLocalStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      // Return without prefix
      keys.push(key.substring(STORAGE_PREFIX.length));
    }
  }

  return keys;
};

/**
 * Set item in localStorage WITHOUT cc3_ prefix (for special cases like migration flags)
 * USE WITH CAUTION - only for system flags that need to persist across app versions
 */
export const setUnprefixedLocalStorageItem = (
  key: string,
  value: string
): void => {
  originalLocalStorage?.setItem(key, value);
};

/**
 * Get item from localStorage WITHOUT cc3_ prefix (for special cases like migration flags)
 */
export const getUnprefixedLocalStorageItem = (key: string): string | null => {
  return originalLocalStorage?.getItem(key) ?? null;
};

// Export prefix for reference if needed
export const STORAGE_KEY_PREFIX = STORAGE_PREFIX;

/**
 * Wrapped localStorage object for @polkadot/api to use.
 * This ensures that all @polkadot/api internal caching also uses the cc3_ prefix.
 *
 * @polkadot/api uses localStorage for caching query results like validators and exposures.
 * By providing this wrapped storage, we ensure those keys also get prefixed.
 */
export const wrappedLocalStorage: Storage = {
  get length(): number {
    return getAllLocalStorageKeys().length;
  },

  clear: (): void => {
    clearLocalStorage();
  },

  getItem: (key: string): string | null => getLocalStorageItem(key),

  key: (index: number): string | null => {
    const keys = getAllLocalStorageKeys();
    return keys[index] || null;
  },

  removeItem: (key: string): void => {
    removeLocalStorageItem(key);
  },

  setItem: (key: string, value: string): void => {
    setLocalStorageItem(key, value);
  },
};
