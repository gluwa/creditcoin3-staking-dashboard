// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { AnyJson } from '@w3ux/react-connect-kit/types';
import type { Sync } from 'types';

export interface PoolPerformanceContextInterface {
  poolRewardPointsFetched: Sync;
  poolRewardPoints: AnyJson;
}
