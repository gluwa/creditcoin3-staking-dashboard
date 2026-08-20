// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import BigNumber from 'bignumber.js';
import React, { useState } from 'react';
import { useApi } from 'contexts/Api';
import { useBalances } from 'contexts/Balances';
import { useBonded } from 'contexts/Bonded';
import { useNetworkMetrics } from 'contexts/NetworkMetrics';
import { usePoolMemberships } from 'contexts/Pools/PoolMemberships';
import type { MaybeAddress } from 'types';
import { useEffectIgnoreInitial } from '@polkadot-cloud/react/hooks';
import { useNetwork } from 'contexts/Network';
import { useActiveAccounts } from 'contexts/ActiveAccounts';
import type { TransferOptions, TransferOptionsContextInterface } from './types';
import {
  calcNominatorTransferOptions,
  getLocalFeeReserve,
  getUnlocking,
  setLocalFeeReserve,
} from './Utils';
import {
  defaultTransferOptions,
  defaultTransferOptionsContext,
} from './defaults';

export const TransferOptionsContext =
  React.createContext<TransferOptionsContextInterface>(
    defaultTransferOptionsContext
  );

export const useTransferOptions = () =>
  React.useContext(TransferOptionsContext);

export const TransferOptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { consts } = useApi();
  const { getAccount } = useBonded();
  const { activeEra } = useNetworkMetrics();
  const { membership } = usePoolMemberships();
  const { activeAccount } = useActiveAccounts();
  const {
    network,
    networkData: { units, defaultFeeReserve },
  } = useNetwork();
  const { getStashLedger, getBalance, getLocks } = useBalances();
  const { existentialDeposit, stakingPalletVersion } = consts;

  // A user-configurable reserve amount to be used to pay for transaction fees.
  const [feeReserve, setFeeReserve] = useState<BigNumber>(
    getLocalFeeReserve(activeAccount, defaultFeeReserve, { network, units })
  );

  // Get the bond and unbond amounts available to the user
  const getTransferOptions = (address: MaybeAddress): TransferOptions => {
    if (getAccount(address) === null) return defaultTransferOptions;

    const { free, frozen } = getBalance(address);
    const { active, total, unlocking } = getStashLedger(address);
    const locks = getLocks(address);
    const {
      maxLock,
      edReserved,
      freeMinusReserve,
      transferrableBalance,
      balanceTxFees,
      freeBalance,
      nominate,
    } = calcNominatorTransferOptions({
      free,
      frozen,
      locks,
      ledger: { active, total, unlocking },
      stakingPalletVersion,
      existentialDeposit,
      feeReserve,
      activeEraIndex: activeEra.index,
    });

    // Get pool-member-specific balances.
    const poolBalances = () => {
      const unlockingPool = membership?.unlocking || [];
      const {
        totalUnlocking: totalUnlockingPool,
        totalUnlocked: totalUnlockedPool,
      } = getUnlocking(unlockingPool, activeEra.index);

      return {
        active: membership?.balance || new BigNumber(0),
        totalUnlocking: totalUnlockingPool,
        totalUnlocked: totalUnlockedPool,
        totalPossibleBond: BigNumber.max(freeMinusReserve.minus(maxLock), 0),
        totalUnlockChunks: unlockingPool.length,
      };
    };

    return {
      freeBalance,
      transferrableBalance,
      balanceTxFees,
      edReserved,
      nominate,
      pool: poolBalances(),
    };
  };

  // Updates account's reserve amount in state and in local storage.
  const setFeeReserveBalance = (amount: BigNumber) => {
    if (!activeAccount) return;
    setLocalFeeReserve(activeAccount, amount, network);
    setFeeReserve(amount);
  };

  // Update an account's reserve amount on account or network change.
  useEffectIgnoreInitial(() => {
    setFeeReserve(
      getLocalFeeReserve(activeAccount, defaultFeeReserve, { network, units })
    );
  }, [activeAccount, network]);

  return (
    <TransferOptionsContext.Provider
      value={{
        getTransferOptions,
        setFeeReserveBalance,
        feeReserve,
      }}
    >
      {children}
    </TransferOptionsContext.Provider>
  );
};
