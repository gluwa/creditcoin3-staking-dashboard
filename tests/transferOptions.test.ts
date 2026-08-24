/* Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
 * SPDX-License-Identifier: GPL-3.0-only */

import BigNumber from 'bignumber.js';
import { expect, test } from 'vitest';
import type { BalanceLock } from 'contexts/Balances/types';
import { calcNominatorTransferOptions } from 'contexts/TransferOptions/Utils';

// Same economic position on both runtimes:
// 7,000 active, 1,000 unlocking, 500 redeemable, 50 identity, 1,450 liquid.
// Ledger total = 8,500. ED = 1, feeReserve = 1.
// `reserved` is recorded on each fixture for the full account picture; it is not
// an input to calcNominatorTransferOptions.
const ed = new BigNumber(1);
const feeReserve = new BigNumber(1);
const activeEraIndex = new BigNumber(10);
const ledger = {
  active: new BigNumber(7000),
  total: new BigNumber(8500),
  unlocking: [
    { era: 20, value: new BigNumber(1000) },
    { era: 5, value: new BigNumber(500) },
  ],
};

const stakingLock: BalanceLock = {
  id: 'staking',
  amount: new BigNumber(8500),
  reasons: 'All',
};

const v15Account = {
  // reserved: 50 identity deposit (unused by the helper).
  reserved: new BigNumber(50),
  free: new BigNumber(9950),
  frozen: new BigNumber(8500),
  locks: [stakingLock],
};

const v16Account = {
  // reserved: 8,500 stake hold + 50 identity (unused by the helper).
  reserved: new BigNumber(8550),
  free: new BigNumber(1450),
  frozen: new BigNumber(0),
  locks: [],
};

const v15Expected = {
  stakeInFree: true,
  edReserved: '0',
  freeMinusReserve: '9949',
  freeBalance: '1449',
  totalPossibleBond: '8449',
  totalAdditionalBond: '1449',
};

test('v15 locks: stake still in free, identity reserved is not subtracted', () => {
  const result = calcNominatorTransferOptions({
    free: v15Account.free,
    frozen: v15Account.frozen,
    locks: v15Account.locks,
    ledger,
    stakingPalletVersion: 15,
    existentialDeposit: ed,
    feeReserve,
    activeEraIndex,
  });

  expect(v15Account.reserved.toString()).toBe('50');
  expect(result.stakeInFree).toBe(v15Expected.stakeInFree);
  expect(result.edReserved.toString()).toBe(v15Expected.edReserved);
  expect(result.freeMinusReserve.toString()).toBe(v15Expected.freeMinusReserve);
  expect(result.freeBalance.toString()).toBe(v15Expected.freeBalance);
  expect(result.nominate.totalPossibleBond.toString()).toBe(
    v15Expected.totalPossibleBond
  );
  expect(result.nominate.totalAdditionalBond.toString()).toBe(
    v15Expected.totalAdditionalBond
  );
});

test('v16 holds: stake already out of free', () => {
  const result = calcNominatorTransferOptions({
    free: v16Account.free,
    frozen: v16Account.frozen,
    locks: v16Account.locks,
    ledger,
    stakingPalletVersion: 16,
    existentialDeposit: ed,
    feeReserve,
    activeEraIndex,
  });

  expect(v16Account.reserved.toString()).toBe('8550');
  expect(result.stakeInFree).toBe(false);
  expect(result.edReserved.toString()).toBe('1');
  expect(result.freeMinusReserve.toString()).toBe('1448');
  expect(result.freeBalance.toString()).toBe('1448');
  expect(result.nominate.totalPossibleBond.toString()).toBe('1448');
  expect(result.nominate.totalAdditionalBond.toString()).toBe('1448');
});

test('v16 leftover staking lock uses the v15 subtract-ledger path', () => {
  const result = calcNominatorTransferOptions({
    free: v15Account.free,
    frozen: v15Account.frozen,
    locks: v15Account.locks,
    ledger,
    stakingPalletVersion: 16,
    existentialDeposit: ed,
    feeReserve,
    activeEraIndex,
  });

  expect(v15Account.reserved.toString()).toBe('50');
  expect(result.stakeInFree).toBe(true);
  expect(result.edReserved.toString()).toBe(v15Expected.edReserved);
  expect(result.freeMinusReserve.toString()).toBe(v15Expected.freeMinusReserve);
  expect(result.freeBalance.toString()).toBe(v15Expected.freeBalance);
  expect(result.nominate.totalPossibleBond.toString()).toBe(
    v15Expected.totalPossibleBond
  );
  expect(result.nominate.totalAdditionalBond.toString()).toBe(
    v15Expected.totalAdditionalBond
  );
});

export {};
