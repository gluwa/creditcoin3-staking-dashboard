// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { AnyApi, NetworkName } from 'types';
import { rmCommas } from '@polkadot-cloud/utils';
import type { Exposure, LocalExposure, LocalExposuresData } from './types';
import { UpgradedNetworks } from 'consts';
import { NetworkList } from 'config/networks';

// Validates if a network is upgraded based on network configuration and current era
export const isNetworkUpgraded = (
  network: NetworkName,
  era: string
): boolean => {
  const networkConfig = NetworkList[network];
  // If network is not in UpgradedNetworks list, it's not upgraded
  if (!UpgradedNetworks.includes(network)) {
    return false;
  }
  // If network has activeEraWhenUpgraded configuration, check era threshold
  if (networkConfig?.activeEraWhenUpgraded !== undefined) {
    return Number(era) > networkConfig.activeEraWhenUpgraded;
  }
  // If no era threshold configured, network is considered upgraded
  return true;
};

// Get local `erasStakers` entries for an era.
export const getLocalEraExposures = (
  network: NetworkName,
  era: string,
  activeEra: string
) => {
  const data = localStorage.getItem(`${network}_exposures`);
  const current = data ? (JSON.parse(data) as LocalExposuresData) : null;
  const currentEra = current?.era;

  if (currentEra && currentEra !== activeEra)
    localStorage.removeItem(`${network}_exposures`);

  if (currentEra === era && current?.exposures)
    return maxifyExposures(current.exposures) as Exposure[];

  return null;
};

// Set local stakers entries data for an era.
export const setLocalEraExposures = (
  network: NetworkName,
  era: string,
  exposures: Exposure[]
) => {
  localStorage.setItem(
    `${network}_exposures`,
    JSON.stringify({
      era,
      exposures: minifyExposures(exposures),
    })
  );
};

// Humanise and remove commas from fetched exposures.
export const formatRawExposures = (exposures: AnyApi) =>
  exposures.map(([k, v]: AnyApi) => {
    const keys = k.toHuman();
    const { own, total, others } = v.toHuman();

    return {
      keys: [rmCommas(keys[0]), keys[1]],
      val: {
        others: others.map(({ who, value }: AnyApi) => ({
          who,
          value: rmCommas(value),
        })),
        own: rmCommas(own),
        total: rmCommas(total),
      },
    };
  });

// Minify exposures data structure for local storage.
const minifyExposures = (exposures: Exposure[]) =>
  exposures.map(({ keys, val: { others, own, total } }: AnyApi) => ({
    k: [keys[0], keys[1]],
    v: {
      o: others.map(({ who, value }: AnyApi) => [who, value]),
      w: own,
      t: total,
    },
  }));

// Expand local exposure data into JSON format.
const maxifyExposures = (exposures: LocalExposure[]) =>
  exposures.map(({ k, v }: AnyApi) => ({
    keys: [k[0], k[1]],
    val: {
      others: v.o.map(([who, value]: AnyApi) => ({
        who,
        value,
      })),
      own: v.w,
      total: v.t,
    },
  }));
