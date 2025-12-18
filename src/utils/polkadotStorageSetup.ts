// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

/**
 * IMPORTANT: This module MUST be imported before any @polkadot/* imports.
 *
 * @polkadot/api and related libraries use localStorage directly for caching
 * query results (validators, exposures, etc.). By monkey-patching the global
 * localStorage before they load, we ensure all their caching also uses our
 * cc3_ prefix.
 *
 * Keys that get prefixed by this:
 * - {network}_validators
 * - {network}_exposures
 * - {network}_era_exposures
 * - {network}_unclaimed_payouts
 * - Any other @polkadot/api cache keys
 */

import { wrappedLocalStorage } from './storage';

// Store the original localStorage for reference
const originalLocalStorage = window.localStorage;

// Use Object.defineProperty to replace the localStorage getter
// This works even though localStorage is normally read-only
try {
  Object.defineProperty(window, 'localStorage', {
    value: wrappedLocalStorage,
    writable: true,
    configurable: true,
  });
} catch (e) {
  // Fallback: If Object.defineProperty fails, log warning
  // eslint-disable-next-line no-console
  console.warn(
    '[CC3] Could not override localStorage. Some keys may not have cc3_ prefix.',
    e
  );
}

// Also update globalThis for environments that use it
if (typeof globalThis !== 'undefined') {
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      value: wrappedLocalStorage,
      writable: true,
      configurable: true,
    });
  } catch (e) {
    // Ignore errors for globalThis
  }
}

// Export original in case we need it for debugging
export { originalLocalStorage };
