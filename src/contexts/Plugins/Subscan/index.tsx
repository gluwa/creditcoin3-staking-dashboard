// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { format, fromUnixTime, getUnixTime, subDays } from 'date-fns';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ApiEndpoints,
  ApiSubscanKey,
  DefaultLocale,
  ListItemsPerPage,
  MaxPayoutDays,
} from 'consts';
import { useNetworkMetrics } from 'contexts/NetworkMetrics';
import { sortNonZeroPayouts } from 'library/Graphs/Utils';
import { useErasToTimeLeft } from 'library/Hooks/useErasToTimeLeft';
import { locales } from 'locale';
import type { AnyApi, AnySubscan } from 'types';
import { useEffectIgnoreInitial } from '@polkadot-cloud/react/hooks';
import { useNetwork } from 'contexts/Network';
import { useActiveAccounts } from 'contexts/ActiveAccounts';
import { useApi } from '../../Api';
import { usePlugins } from '..';
import { defaultSubscanContext } from './defaults';
import type { SubscanContextInterface } from './types';

const SUBSCAN_PAGE_SIZE = 100;

export const SubscanProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { i18n } = useTranslation();
  const { isReady } = useApi();
  const {
    network,
    networkData: { subscanEndpoint },
  } = useNetwork();
  const { activeAccount } = useActiveAccounts();
  const { activeEra } = useNetworkMetrics();
  const { erasToSeconds } = useErasToTimeLeft();
  const { plugins, pluginEnabled } = usePlugins();

  // store fetched payouts from Subscan
  const [payouts, setPayouts] = useState<AnySubscan>([]);

  // store fetched pool claims from Subscan
  const [poolClaims, setPoolClaims] = useState<AnySubscan>([]);

  // store fetched unclaimed payouts from Subscan
  const [unclaimedPayouts, setUnclaimedPayouts] = useState<AnyApi>([]);

  // store the start date of fetched payouts and pool claims combined.
  const [payoutsFromDate, setPayoutsFromDate] = useState<string | undefined>();

  // store the end date of fetched payouts and pool claims combined.
  const [payoutsToDate, setPayoutsToDate] = useState<string | undefined>();

  // handle fetching the various types of payout and set state in one render.
  const handleFetchPayouts = async () => {
    const results = await Promise.all([fetchPayouts(), fetchPoolClaims()]);

    const { newClaimedPayouts, newUnclaimedPayouts } = results[0];
    const newPoolClaims = results[1];

    setPayouts(newClaimedPayouts);
    setUnclaimedPayouts(newUnclaimedPayouts);
    setPoolClaims(newPoolClaims);
  };

  const fetchSubscanPagesUntilCutoff = async (
    endpoint: string,
    body: AnyApi,
    getTimestampsForCutoff: (list: AnySubscan) => number[]
  ) => {
    const cutoffTimestamp = getUnixTime(subDays(new Date(), MaxPayoutDays));
    const maxPages = 10;
    let page = 0;
    let list: AnySubscan = [];

    while (page < maxPages) {
      // eslint-disable-next-line no-await-in-loop
      const result = await handleFetch(page, endpoint, SUBSCAN_PAGE_SIZE, body);
      if (!pluginEnabled('subscan') || !result?.data?.list?.length) break;

      const pageList = result.data.list;
      list = list.concat(pageList);

      if (pageList.length < SUBSCAN_PAGE_SIZE) break;

      const timestamps = getTimestampsForCutoff(pageList).filter(
        (t: number) => t > 0
      );
      if (timestamps.length > 0 && Math.min(...timestamps) <= cutoffTimestamp) {
        break;
      }

      page++;
    }

    return list;
  };

  // reset all payout state
  const resetPayouts = () => {
    setPayouts([]);
    setUnclaimedPayouts([]);
    setPoolClaims([]);
  };

  // Reset payouts on network switch.
  useEffectIgnoreInitial(() => {
    resetPayouts();
  }, [network]);

  // Reset payouts on no active account.
  useEffectIgnoreInitial(() => {
    if (!activeAccount) resetPayouts();
  }, [activeAccount]);

  // Reset payouts on subscan plugin not enabled.
  useEffectIgnoreInitial(() => {
    if (!plugins.includes('subscan')) resetPayouts();
    else if (isReady && !activeEra.isPlaceholder) handleFetchPayouts();
  }, [plugins.includes('subscan'), isReady, activeEra]);

  // Fetch payouts as soon as network is ready.
  useEffectIgnoreInitial(() => {
    if (isReady && !activeEra.isPlaceholder) {
      handleFetchPayouts();
    }
  }, [isReady, network, activeAccount, activeEra]);

  // Store start and end date of fetched payouts.
  useEffectIgnoreInitial(() => {
    const filteredPayouts = sortNonZeroPayouts(payouts, poolClaims, true);
    if (filteredPayouts.length) {
      setPayoutsFromDate(
        format(
          fromUnixTime(
            filteredPayouts[filteredPayouts.length - 1].block_timestamp
          ),
          'do MMM',
          {
            locale: locales[i18n.resolvedLanguage ?? DefaultLocale],
          }
        )
      );

      // latest payout date
      setPayoutsToDate(
        format(fromUnixTime(filteredPayouts[0].block_timestamp), 'do MMM', {
          locale: locales[i18n.resolvedLanguage ?? DefaultLocale],
        })
      );
    }
  }, [payouts, poolClaims, unclaimedPayouts]);

  /* fetchPayouts
   * Fetches payout history from Subscan, paginating until the full MaxPayoutDays
   * window is covered. Stops when the oldest claimed payout is beyond the cutoff,
   * the API returns fewer results than requested, or a safety page limit is reached.
   */
  const fetchPayouts = async () => {
    let newClaimedPayouts: AnySubscan[] = [];
    let newUnclaimedPayouts: AnySubscan[] = [];

    if (activeAccount && pluginEnabled('subscan')) {
      const fullList = await fetchSubscanPagesUntilCutoff(
        ApiEndpoints.subscanRewardSlash,
        {
          address: activeAccount,
          is_stash: true,
        },
        (list: AnySubscan) =>
          list
            .filter((l: AnyApi) => l.block_timestamp !== 0)
            .map((l: AnyApi) => l.block_timestamp)
      );

      newClaimedPayouts = fullList.filter((l: AnyApi) => l.block_timestamp !== 0);
      newUnclaimedPayouts = fullList.filter(
        (l: AnyApi) => l.block_timestamp === 0
      );

      // Inject block_timestamp for unclaimed payouts. We take the timestamp
      // of the start of the following payout era - this is the time payouts
      // become available to claim by validators.
      newUnclaimedPayouts.forEach((p: AnyApi) => {
        p.block_timestamp = activeEra.start
          .multipliedBy(0.001)
          .minus(erasToSeconds(activeEra.index.minus(p.era).minus(1)))
          .toNumber();
      });
    }

    newClaimedPayouts.sort((a, b) => b.block_timestamp - a.block_timestamp);
    newUnclaimedPayouts.sort((a, b) => b.block_timestamp - a.block_timestamp);

    return {
      newClaimedPayouts,
      newUnclaimedPayouts,
    };
  };

  /* fetchPoolClaims
   * Fetches pool claim history from Subscan, paginating until the full
   * MaxPayoutDays window is covered.
   */
  const fetchPoolClaims = async () => {
    let newPoolClaims: AnySubscan[] = [];

    if (activeAccount && pluginEnabled('subscan')) {
      const fullList = await fetchSubscanPagesUntilCutoff(
        ApiEndpoints.subscanPoolRewards,
        {
          address: activeAccount,
        },
        (list: AnySubscan) =>
          list
            .filter((l: AnyApi) => l.block_timestamp !== 0)
            .map((l: AnyApi) => l.block_timestamp)
      );

      newPoolClaims = fullList.filter((l: AnyApi) => l.block_timestamp !== 0);
    }
    return newPoolClaims;
  };

  /* fetchEraPoints
   * fetches recent era point history for a particular address.
   * Also checks if subscan service is active *after* the fetch has resolved
   * as the user could have turned off the service while payouts were fetching.
   * returns eraPoints
   */
  const fetchEraPoints = async (address: string, era: number) => {
    if (address === '' || !plugins.includes('subscan')) {
      return [];
    }
    const res = await handleFetch(0, ApiEndpoints.subscanEraStat, 100, {
      address,
    });

    if (res.message === 'Success') {
      if (pluginEnabled('subscan')) {
        if (res.data?.list !== null) {
          const list = [];
          for (let i = era; i > era - 100; i--) {
            list.push({
              era: i,
              reward_point:
                res.data.list.find((item: AnySubscan) => item.era === i)
                  ?.reward_point ?? 0,
            });
          }
          // removes last zero item and returns
          return list.reverse().splice(0, list.length - 1);
        }
        return [];
      }
    }
    return [];
  };

  /* fetchPoolDetails
   * Also checks if subscan service is active *after* the fetch has resolved
   * as the user could have turned off the service while payouts were fetching.
   */
  const fetchPoolDetails = async (poolId: number) => {
    if (!plugins.includes('subscan')) {
      return [];
    }
    const res: Response = await fetch(
      subscanEndpoint + ApiEndpoints.subscanPoolDetails,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': ApiSubscanKey,
        },
        body: JSON.stringify({
          pool_id: poolId,
        }),
        method: 'POST',
      }
    );
    const json: AnySubscan = await res.json();
    return json?.data || undefined;
  };

  /* fetchPoolMembers
   * Also checks if subscan service is active *after* the fetch has resolved
   * as the user could have turned off the service while payouts were fetching.
   */
  const fetchPoolMembers = async (poolId: number, page: number) => {
    if (!plugins.includes('subscan')) {
      return [];
    }
    const res = await handleFetch(
      page - 1,
      ApiEndpoints.subscanPoolMembers,
      ListItemsPerPage,
      {
        pool_id: poolId,
      }
    );

    if (res.message === 'Success') {
      if (pluginEnabled('subscan')) {
        if (res.data?.list !== null) {
          const result = res.data?.list || [];
          const list: AnySubscan = [];
          for (const item of result) {
            list.push({
              who: item.account_display.address,
              poolId: item.pool_id,
            });
          }
          return list.reverse();
        }
      }
      return [];
    }
    return [];
  };

  /* handleFetch
   * utility to handle a fetch request to Subscan
   * returns resulting JSON.
   */
  const handleFetch = async (
    page: number,
    endpoint: string,
    row: number,
    body: AnyApi = {}
  ): Promise<AnySubscan> => {
    const bodyJson = {
      row,
      page,
      ...body,
    };
    const res: Response = await fetch(subscanEndpoint + endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ApiSubscanKey,
      },
      body: JSON.stringify(bodyJson),
      method: 'POST',
    });
    const resJson: AnySubscan = await res.json();
    return resJson;
  };

  return (
    <SubscanContext.Provider
      value={{
        fetchEraPoints,
        payouts,
        poolClaims,
        unclaimedPayouts,
        payoutsFromDate,
        payoutsToDate,
        fetchPoolDetails,
        fetchPoolMembers,
        setUnclaimedPayouts,
      }}
    >
      {children}
    </SubscanContext.Provider>
  );
};

export const SubscanContext = React.createContext<SubscanContextInterface>(
  defaultSubscanContext
);

export const useSubscan = () => React.useContext(SubscanContext);
