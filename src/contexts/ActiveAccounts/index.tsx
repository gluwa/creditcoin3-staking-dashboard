// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { MaybeAddress } from 'types';
import { setStateWithRef } from '@polkadot-cloud/utils';
import { useNetwork } from 'contexts/Network';
import type { ActiveAccountsContextInterface, ActiveProxy } from './types';
import { defaultActiveAccountsContext } from './defaults';
import { setLocalStorageItem, removeLocalStorageItem } from 'utils/storage';

export const ActiveAccountsContext =
  createContext<ActiveAccountsContextInterface>(defaultActiveAccountsContext);

export const ActiveAccountsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { network } = useNetwork();

  // Store the currently active account.
  const [activeAccount, setActiveAccountState] = useState<MaybeAddress>(null);
  const activeAccountRef = useRef<string | null>(activeAccount);

  // Store the active proxy account.
  const [activeProxy, setActiveProxyState] = useState<ActiveProxy>(null);
  const activeProxyRef = useRef(activeProxy);

  // Setter for the active proxy account.
  const setActiveProxy = (newActiveProxy: ActiveProxy, updateLocal = true) => {
    if (updateLocal)
      if (newActiveProxy) {
        setLocalStorageItem(
          `${network}_active_proxy`,
          JSON.stringify(newActiveProxy)
        );
      } else {
        removeLocalStorageItem(`${network}_active_proxy`);
      }
    setStateWithRef(newActiveProxy, setActiveProxyState, activeProxyRef);
  };

  // Setter for the active account.
  const setActiveAccount = (
    newActiveAccount: MaybeAddress,
    updateLocalStorage: boolean = true
  ) => {
    if (updateLocalStorage)
      if (newActiveAccount === null)
        removeLocalStorageItem(`${network}_active_account`);
      else setLocalStorageItem(`${network}_active_account`, newActiveAccount);

    setStateWithRef(newActiveAccount, setActiveAccountState, activeAccountRef);
  };

  // Getter for the active account.
  const getActiveAccount = () => activeAccountRef.current;

  // Disconnect from the active account on network change, but don't remove local record.
  useEffect(() => setActiveAccount(null, false), [network]);

  return (
    <ActiveAccountsContext.Provider
      value={{
        activeAccount: activeAccountRef.current,
        activeProxy: activeProxyRef.current?.address ?? null,
        activeProxyType: activeProxyRef.current?.proxyType ?? null,
        setActiveAccount,
        getActiveAccount,
        setActiveProxy,
      }}
    >
      {children}
    </ActiveAccountsContext.Provider>
  );
};

export const useActiveAccounts = () => useContext(ActiveAccountsContext);
