// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import React, { useState } from 'react';
import { NetworkList } from 'config/networks';
import { AppVersion } from 'consts';
import { useApi } from 'contexts/Api';
import { useUi } from 'contexts/UI';
import { useEffectIgnoreInitial } from '@polkadot-cloud/react/hooks';
import { useImportedAccounts } from 'contexts/Connect/ImportedAccounts';
import {
  getLocalStorageItem,
  getUnprefixedLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
  setUnprefixedLocalStorageItem,
  STORAGE_KEY_PREFIX,
} from 'utils/storage';

export const MigrateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isReady } = useApi();
  const { isNetworkSyncing } = useUi();
  const { accounts } = useImportedAccounts();

  // The local app version of the current user.
  const localAppVersion = getLocalStorageItem('app_version');

  // Store whether the migration check has taken place.
  // IMPORTANT: Initialize based on the unprefixed migration flag, not app_version
  // This ensures the flag persists across page refreshes
  const MIGRATION_FLAG = '__cc3_migration_completed__';
  const [done, setDone] = useState<boolean>(
    getUnprefixedLocalStorageItem(MIGRATION_FLAG) === 'true'
  );

  // Removes the previous nominator setup objects from local storage.
  const removeDeprecatedNominatorSetups = () =>
    Object.values(NetworkList).forEach((n: any) => {
      for (const a of accounts)
        removeLocalStorageItem(`${n.name}_stake_setup_${a.address}`);
    });

  // Removes the previous pool setup objects from local storage.
  const removeDeprecatedPoolSetups = () =>
    Object.values(NetworkList).forEach((n: any) => {
      for (const a of accounts)
        removeLocalStorageItem(`${n.name}_pool_setup_${a.address}`);
    });

  // Removes the previous active proxies from local storage.
  const removeDeprecatedActiveProxies = () =>
    Object.values(NetworkList).forEach((n: any) => {
      removeLocalStorageItem(`${n.name}_active_proxy`);
    });

  // Clears all CC2 localStorage keys (keys without cc3_ prefix).
  // This ensures no old CC2 data is accidentally used by CC3.
  // IMPORTANT: Preserves the migration flag so it doesn't run again.
  const clearCC2LocalStorage = () => {
    const keysToRemove: string[] = [];

    // Find all keys that DON'T have the cc3_ prefix (CC2 keys)
    // BUT preserve the migration flag and migration date
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        !key.startsWith(STORAGE_KEY_PREFIX) &&
        key !== MIGRATION_FLAG &&
        key !== '__cc3_migration_date__'
      ) {
        keysToRemove.push(key);
      }
    }

    // Remove all CC2 keys (but not the migration flags)
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  };

  useEffectIgnoreInitial(() => {
    if (isReady && !isNetworkSyncing && !done) {
      // ALWAYS check for and clean CC2 data, regardless of migration flag
      // This ensures that any CC2 keys that appear (from extensions, etc.) are immediately removed
      let hasCC2Data = false;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          key &&
          !key.startsWith(STORAGE_KEY_PREFIX) &&
          key !== MIGRATION_FLAG &&
          key !== '__cc3_migration_date__'
        ) {
          hasCC2Data = true;
          break;
        }
      }

      if (hasCC2Data) {
        // Clear ALL CC2 localStorage keys (keys without cc3_ prefix)
        clearCC2LocalStorage();
      }

      // Check the unprefixed migration flag
      const cc2MigrationCompleted =
        getUnprefixedLocalStorageItem(MIGRATION_FLAG);

      // If first time migration, mark as completed
      if (!cc2MigrationCompleted) {
        setUnprefixedLocalStorageItem(MIGRATION_FLAG, 'true');
        setUnprefixedLocalStorageItem(
          '__cc3_migration_date__',
          new Date().toISOString()
        );
        setLocalStorageItem('app_version', AppVersion);
        setDone(true);
        return;
      }

      // Carry out normal version migrations if local version is different to current version.
      if (localAppVersion !== AppVersion) {
        // Added in 1.0.2.
        //
        // Remove local language resources. No expiry.
        removeLocalStorageItem('lng_resources');

        // Added in 1.0.4.
        //
        // Remove legacy local nominator setup and pool setup items.
        removeDeprecatedNominatorSetups();
        removeDeprecatedPoolSetups();

        // Added in 1.0.8.
        //
        // Remove legacy local active proxy records.
        removeDeprecatedActiveProxies();

        // Finally,
        //
        // Update local version to current app version.
        setLocalStorageItem('app_version', AppVersion);
        setDone(true);
      }
    }
  }, [isNetworkSyncing]);

  return (
    <MigrateContext.Provider value={{}}>{children}</MigrateContext.Provider>
  );
};

export const MigrateContext = React.createContext<any>(null);
