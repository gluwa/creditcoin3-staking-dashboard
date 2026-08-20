// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { MaybeAddress } from '@polkadot-cloud/react/types';
import { unitToPlanck } from '@polkadot-cloud/utils';
import BigNumber from 'bignumber.js';
import type { BalanceLock, UnlockChunk } from 'contexts/Balances/types';
import type { NetworkName } from 'types';
import type { TransferOptions } from './types';

export interface NominatorTransferInputs {
  free: BigNumber;
  frozen: BigNumber;
  locks: BalanceLock[];
  ledger: {
    active: BigNumber;
    total: BigNumber;
    unlocking: UnlockChunk[];
  };
  stakingPalletVersion: number;
  existentialDeposit: BigNumber;
  feeReserve: BigNumber;
  activeEraIndex: BigNumber;
}

export interface NominatorTransferOptions {
  stakeInFree: boolean;
  maxLock: BigNumber;
  edReserved: BigNumber;
  freeMinusReserve: BigNumber;
  transferrableBalance: BigNumber;
  balanceTxFees: BigNumber;
  freeBalance: BigNumber;
  nominate: TransferOptions['nominate'];
}

// Gets the total unlocking and unlocked amount.
export const getUnlocking = (chunks: UnlockChunk[], thisEra: BigNumber) => {
  let totalUnlocking = new BigNumber(0);
  let totalUnlocked = new BigNumber(0);

  for (const { value, era } of chunks)
    if (thisEra.isGreaterThan(era)) {
      totalUnlocked = totalUnlocked.plus(value);
    } else {
      totalUnlocking = totalUnlocking.plus(value);
    }
  return { totalUnlocking, totalUnlocked };
};

// Gets the total locked amount from an account's locks.
export const getLocked = (locks: BalanceLock[]) =>
  locks?.reduce((prev, { amount }) => prev.plus(amount), new BigNumber(0)) ||
  new BigNumber(0);

// Gets the largest lock balance, dictating the total amount of unavailable funds from locks.
export const getMaxLock = (locks: BalanceLock[]) =>
  locks.reduce(
    (prev, current) =>
      prev.amount.isGreaterThan(current.amount) ? prev : current,
    { amount: new BigNumber(0) }
  )?.amount || new BigNumber(0);

// Dual-paradigm nominator spendable amounts.
// v15 (or a leftover staking lock on v16): bonded CTC is still inside `free`.
// v16 migrated: bonded CTC is a hold in reserved, so `free` is already unbonded.
export const calcNominatorTransferOptions = ({
  free,
  frozen,
  locks,
  ledger: { active, total, unlocking },
  stakingPalletVersion,
  existentialDeposit,
  feeReserve,
  activeEraIndex,
}: NominatorTransferInputs): NominatorTransferOptions => {
  const maxLock = getMaxLock(locks);
  // Does `free` include any bonded CTC?
  const stakeInFree =
    stakingPalletVersion < 16 || locks.some(({ id }) => id === 'staking');

  const edReserved = BigNumber.max(existentialDeposit.minus(maxLock), 0);
  // Free balance after removing the existential deposit and the fee reserve (amount of CTC to reserve, specified by user in UI so they don't accidentally run out of gas)
  const freeMinusReserve = BigNumber.max(
    free.minus(edReserved).minus(feeReserve),
    0
  );
  const transferrableBalance = BigNumber.max(freeMinusReserve.minus(frozen), 0);
  // Spendable free that can pay tx fees (ignores the user's feeReserve buffer).
  const balanceTxFees = BigNumber.max(free.minus(edReserved).minus(frozen), 0);
  const { totalUnlocking, totalUnlocked } = getUnlocking(
    unlocking,
    activeEraIndex
  );

  // Unbonded leftover: subtract the ledger only when bonded CTC still sits in `free`.
  const freeBalance = BigNumber.max(
    stakeInFree ? freeMinusReserve.minus(total) : freeMinusReserve,
    0
  );

  // Max you could have bonded: leftover free, plus active only when stake still sits in `free`.
  const totalPossibleBond = stakeInFree
    ? BigNumber.max(
        freeMinusReserve.minus(totalUnlocking).minus(totalUnlocked),
        0
      )
    : freeMinusReserve;

  return {
    stakeInFree,
    maxLock,
    edReserved,
    freeMinusReserve,
    transferrableBalance,
    balanceTxFees,
    freeBalance,
    nominate: {
      active,
      totalUnlocking,
      totalUnlocked,
      totalPossibleBond,
      totalAdditionalBond: stakeInFree
        ? BigNumber.max(totalPossibleBond.minus(active), 0)
        : freeMinusReserve,
      totalUnlockChunks: unlocking.length,
    },
  };
};

// Get the local storage record for an account reserve balance.
export const getLocalFeeReserve = (
  address: MaybeAddress,
  defaultReserve: number,
  { network, units }: { network: NetworkName; units: number }
) => {
  const reserves = JSON.parse(localStorage.getItem('reserve_balances') ?? '{}');
  return new BigNumber(
    reserves?.[network]?.[address || ''] ??
      unitToPlanck(String(defaultReserve), units)
  );
};

// Sets the local storage record fro an account reserve balance.
export const setLocalFeeReserve = (
  address: MaybeAddress,
  amount: BigNumber,
  network: NetworkName
) => {
  if (!address) return;
  try {
    const newReserves = JSON.parse(
      localStorage.getItem('reserve_balances') ?? '{}'
    );
    const networkReserves = newReserves?.[network] ?? {};
    networkReserves[address] = amount.toString();
    newReserves[network] = networkReserves;
    localStorage.setItem('reserve_balances', JSON.stringify(newReserves));
  } catch (e) {
    localStorage.removeItem('reserve_balances');
  }
};
