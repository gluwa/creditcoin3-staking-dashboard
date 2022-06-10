// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { useState, useEffect, useRef } from 'react';
import { bnToU8a, u8aConcat } from '@polkadot/util';
import { useStaking } from 'contexts/Staking';
import { useNetworkMetrics } from 'contexts/Network';
import { APIContextInterface } from 'types/api';
import { ConnectContextInterface } from 'types/connect';
import { MaybeAccount } from 'types';
import { PoolsConfigContextState, PoolsContextState } from 'types/pools';
import { EMPTY_H256, MOD_PREFIX, U32_OPTS } from 'consts';
import { useBalances } from '../Balances';
import * as defaults from './defaults';
import { useApi } from '../Api';
import { useConnect } from '../Connect';
import { usePoolsConfig } from './Config';
import {
  rmCommas,
  toFixedIfNecessary,
  planckBnToUnit,
  localStorageOrDefault,
  setStateWithRef,
} from '../../Utils';

export const PoolsContext = React.createContext<PoolsContextState | null>(null);

export const usePools = () => React.useContext(PoolsContext);

export const PoolsProvider = ({ children }: { children: React.ReactNode }) => {
  const { api, network, isReady, consts } = useApi() as APIContextInterface;
  const { metrics } = useNetworkMetrics();
  const { eraStakers } = useStaking();
  const { activeAccount } = useConnect() as ConnectContextInterface;
  const { getAccountBalance }: any = useBalances();
  const { enabled } = usePoolsConfig() as PoolsConfigContextState;

  const { activeEra } = metrics;
  const { poolsPalletId, existentialDeposit } = consts;
  const { units } = network;

  // stores pool membership
  const [poolMembership, setPoolMembership]: any = useState({
    membership: undefined,
    unsub: null,
  });

  // stores member's bonded pool
  const [activeBondedPool, setActiveBondedPool]: any = useState({
    pool: undefined,
    unsub: null,
  });

  // validators that are currently nominated by the activeBonded pool.
  const [poolNominations, setPoolNominations]: any = useState({
    noominations: defaults.nominations,
    unsub: null,
  });

  // store account target validators
  const [targets, _setTargets]: any = useState(defaults.targets);

  // stores the meta data batches for pool lists
  const [poolMetaBatches, setPoolMetaBatch]: any = useState({});
  const poolMetaBatchesRef = useRef(poolMetaBatches);

  // stores the meta batch subscriptions for pool lists
  const [poolSubs, setPoolSubs]: any = useState({});
  const poolSubsRef = useRef(poolSubs);

  // store bonded pools
  const [bondedPools, setBondedPools]: any = useState([]);

  useEffect(() => {
    if (isReady && enabled) {
      fetchBondedPools();
    }
    return () => {
      unsubscribe();
    };
  }, [network, isReady, enabled]);

  const unsubscribe = () => {
    if (poolMembership.unsub !== null) {
      poolMembership.unsub();
    }
    if (activeBondedPool.unsub !== null) {
      activeBondedPool.unsub();
    }
    if (poolNominations.unsub !== null) {
      poolNominations.unsub();
    }
    setBondedPools([]);
  };

  useEffect(() => {
    if (isReady && enabled && activeAccount) {
      subscribeToPoolMembership(activeAccount);
    }
    return () => {
      unsubscribePoolMembership();
    };
  }, [network, isReady, activeAccount, enabled]);

  const unsubscribePoolMembership = () => {
    if (poolMembership?.unsub) {
      poolMembership.unsub();
    }
    setPoolMembership({
      membership: undefined,
      unsub: null,
    });
  };

  // subscribe to active bonded pool deatils
  useEffect(() => {
    const membership = poolMembership?.membership;
    if (isReady && enabled && membership) {
      subscribeToActiveBondedPool(membership);
    }
    return () => {
      unsubscribeActiveBondedPool();
    };
  }, [network, isReady, enabled, poolMembership?.membership]);

  const unsubscribeActiveBondedPool = () => {
    if (activeBondedPool?.unsub) {
      activeBondedPool?.unsub();
    }
    setActiveBondedPool({
      membership: undefined,
      unsub: null,
    });
  };

  // subscribe to pool nominations
  const bondedAddress = activeBondedPool.pool?.addresses?.stash;
  useEffect(() => {
    if (isReady && enabled && bondedAddress) {
      subscribeToPoolNominations(bondedAddress);
    }
    return () => {
      unsubscribePoolNominations();
    };
  }, [network, isReady, bondedAddress, enabled]);

  const unsubscribePoolNominations = () => {
    if (poolNominations?.unsub) {
      poolNominations.unsub();
    }
    setPoolNominations({
      nominations: defaults.nominations,
      unsub: null,
    });
  };

  // subscribe to accounts membership
  const subscribeToPoolMembership = async (address: string) => {
    if (!api) return;

    const unsub = await api.query.nominationPools.poolMembers(
      address,
      async (result: any) => {
        let membership = result?.unwrapOr(undefined)?.toHuman();
        if (membership) {
          // format pool's unlocking chunks
          const unbondingEras: any = membership.unbondingEras;
          const unlocking = [];
          for (const [e, v] of Object.entries(unbondingEras || {})) {
            const era = rmCommas(e as string);
            const value = rmCommas(v as string);
            unlocking.push({
              era: Number(era),
              value: new BN(value),
            });
          }
          membership.points = membership.points
            ? rmCommas(membership.points)
            : '0';
          membership = { ...membership, unlocking };
        }
        setPoolMembership({ membership, unsub });
      }
    );
    return unsub;
  };

  const calculatePayout = (
    membership: any,
    bondedPool: any,
    rewardPool: any,
    rewardAccountBalance: BN
  ): BN => {
    // calculate the latest reward account balance minus the existential deposit
    const newRewardPoolBalance = BN.max(
      new BN(0),
      new BN(rewardAccountBalance).sub(existentialDeposit)
    );

    const lastRewardPoolBalance = new BN(rmCommas(rewardPool.balance));
    let poolTotalEarnings = new BN(rmCommas(rewardPool.totalEarnings));
    const rewardPoints = new BN(rmCommas(rewardPool.points));
    const bondedPoints = new BN(rmCommas(bondedPool.points));
    const memberPoints = new BN(rmCommas(membership.points));

    // the pool total earning the last time the member claimed his rewards
    const poolTotalEarningsAtLastClaim = new BN(
      rmCommas(membership.rewardPoolTotalEarnings)
    );

    // new generated earning
    const generatedEarning = BN.max(
      new BN(0),
      newRewardPoolBalance.sub(lastRewardPoolBalance)
    );

    // update poolTotalEarning
    poolTotalEarnings = poolTotalEarnings.add(generatedEarning);

    // The new points that will be added to the pool. For every unit of balance that has been
    // earned by the reward pool, we inflate the reward pool points by `bonded_pool.points`. In
    // effect this allows each, single unit of balance (e.g. plank) to be divvied up pro rata
    // among members based on points.
    const generatedPoints = bondedPoints.mul(generatedEarning);

    const currentRewardPoints = rewardPoints.add(generatedPoints);

    const generatedEarningSinceLastClaim = BN.max(
      new BN(0),
      poolTotalEarnings.sub(poolTotalEarningsAtLastClaim)
    );

    const memberCurrentRewardPoint = memberPoints.mul(
      generatedEarningSinceLastClaim
    );
    const payout = currentRewardPoints.isZero()
      ? new BN(0)
      : memberCurrentRewardPoint
          .mul(newRewardPoolBalance)
          .div(currentRewardPoints);

    return payout;
  };

  const subscribeToActiveBondedPool = async (membership: any) => {
    if (!api || !membership) {
      return;
    }
    const { poolId } = membership;
    const addresses = createAccounts(poolId);
    const unsub: any = await api.queryMulti(
      [
        [api.query.nominationPools.bondedPools, poolId],
        [api.query.nominationPools.rewardPools, poolId],
        [api.query.staking.slashingSpans, addresses.stash],
        [api.query.system.account, addresses.reward],
      ],
      ([bondedPool, rewardPool, slashingSpans, { data: balance }]: any) => {
        bondedPool = bondedPool?.unwrapOr(undefined)?.toHuman();
        rewardPool = rewardPool?.unwrapOr(undefined)?.toHuman();
        if (rewardPool && bondedPool) {
          const slashingSpansCount = slashingSpans.isNone
            ? 0
            : slashingSpans.unwrap().prior.length + 1;
          const rewardAccountBalance = balance?.free;
          const unclaimedReward = calculatePayout(
            membership,
            bondedPool,
            rewardPool,
            rewardAccountBalance
          );
          const pool = {
            ...bondedPool,
            id: poolId,
            slashingSpansCount,
            unclaimedReward,
            addresses,
          };
          setActiveBondedPool({ pool, unsub });

          if (addresses?.stash) {
            // set pool staking targets
            _setTargets(
              localStorageOrDefault(
                `${addresses?.stash}_pool_targets`,
                defaults.targets,
                true
              )
            );
          }
        }
      }
    );
    return unsub;
  };

  const subscribeToPoolNominations = async (poolBondAddress: string) => {
    if (!api) return;
    const unsub = await api.query.staking.nominators(
      poolBondAddress,
      (nominations: any) => {
        // set pool nominations
        let _nominations = nominations.unwrapOr(null);
        if (_nominations === null) {
          _nominations = defaults.nominations;
        } else {
          _nominations = {
            targets: _nominations.targets.toHuman(),
            submittedIn: _nominations.submittedIn.toHuman(),
          };
        }
        setPoolNominations({ nominations: _nominations, unsub });
      }
    );
    return unsub;
  };

  const getPoolWithAddresses = (id: number, pool: any) => {
    return {
      ...pool,
      id,
      addresses: createAccounts(id),
    };
  };

  /* Sets pools target validators in storage */
  const setTargets = (_targets: any) => {
    const stashAddress = getPoolBondedAccount();
    if (stashAddress) {
      localStorage.setItem(
        `${stashAddress}_pool_targets`,
        JSON.stringify(_targets)
      );
      _setTargets(_targets);
    }
  };

  const getPoolUnlocking = () => {
    return poolMembership?.membership?.unlocking || [];
  };

  const isBonding = () => {
    return !!activeBondedPool?.pool;
  };

  const isNominator = () => {
    const roles = activeBondedPool?.pool?.roles;
    if (!activeAccount || !roles) {
      return false;
    }
    const result =
      activeAccount === roles?.root || activeAccount === roles?.nominator;
    return result;
  };

  const isOwner = () => {
    const roles = activeBondedPool.pool?.roles;
    if (!activeAccount || !roles) {
      return false;
    }
    const result =
      activeAccount === roles?.root || activeAccount === roles?.stateToggler;
    return result;
  };

  const isDepositor = () => {
    const roles = activeBondedPool.pool?.roles;
    if (!activeAccount || !roles) {
      return false;
    }
    const result = activeAccount === roles?.depositor;
    return result;
  };

  // get the stash address of the bonded pool that the member is participating in.
  const getPoolBondedAccount = () => {
    return activeBondedPool.pool?.addresses?.stash;
  };

  // unsubscribe from any meta batches upon network change
  useEffect(() => {
    return () => {
      Object.values(poolSubsRef.current).map((batch: any, index: number) => {
        return Object.entries(batch).map(([k, v]: any) => {
          return v();
        });
      });
    };
  }, [isReady, network]);

  // fetch all bonded pool entries
  const fetchBondedPools = async () => {
    if (!api) return;

    const _exposures = await api.query.nominationPools.bondedPools.entries();
    // humanise exposures to send to worker
    const exposures = _exposures.map(([_keys, _val]: any) => {
      const id = _keys.toHuman()[0];
      const pool = _val.toHuman();
      return getPoolWithAddresses(id, pool);
    });

    setBondedPools(exposures);
  };

  // generates pool stash and reward accounts. assumes poolsPalletId is synced.
  const createAccounts = (poolId: number): any => {
    const poolIdBN = new BN(poolId);
    return {
      stash: createAccount(poolIdBN, 0),
      reward: createAccount(poolIdBN, 1),
    };
  };

  const createAccount = (poolId: BN, index: number): string => {
    if (!api) return '';
    return api.registry
      .createType(
        'AccountId32',
        u8aConcat(
          MOD_PREFIX,
          poolsPalletId,
          new Uint8Array([index]),
          bnToU8a(poolId, U32_OPTS),
          EMPTY_H256
        )
      )
      .toString();
  };

  // get the bond and unbond amounts available to the user
  const getPoolBondOptions = (address: MaybeAccount) => {
    if (!address) {
      return defaults.poolBondOptions;
    }
    const { freeAfterReserve, miscFrozen } = getAccountBalance(address);
    const membership = poolMembership.membership;
    const unlocking = membership?.unlocking || [];
    const points = membership?.points;
    let freeToUnbond = 0;
    const active = points ? new BN(points) : new BN(0); // point to balance ratio is 1
    if (membership) {
      freeToUnbond = toFixedIfNecessary(planckBnToUnit(active, units), units);
    }

    // total amount actively unlocking
    let totalUnlockingBn = new BN(0);
    let totalUnlockedBn = new BN(0);

    for (const u of unlocking) {
      const { value, era } = u;
      if (activeEra.index > era) {
        totalUnlockedBn = totalUnlockedBn.add(value);
      } else {
        totalUnlockingBn = totalUnlockingBn.add(value);
      }
    }
    const totalUnlocking = planckBnToUnit(totalUnlockingBn, units);
    const totalUnlocked = planckBnToUnit(totalUnlockedBn, units);

    // free transferrable balance that can be bonded in the pool
    const freeToBond: any = Math.max(
      toFixedIfNecessary(
        planckBnToUnit(freeAfterReserve, units) -
          planckBnToUnit(miscFrozen, units) -
          totalUnlocking -
          totalUnlocked,
        units
      ),
      0
    );

    // total possible balance that can be bonded in the pool
    const totalPossibleBond = toFixedIfNecessary(
      planckBnToUnit(freeAfterReserve, units) - totalUnlocking - totalUnlocked,
      units
    );

    return {
      active,
      freeToBond,
      freeToUnbond,
      totalUnlocking,
      totalUnlocked,
      totalPossibleBond,
      totalUnlockChuncks: unlocking.length,
    };
  };

  /*
    Fetches a new batch of pool metadata.
    Fetches the metadata of a pool that we assume to be a string.
    structure:
    {
      key: {
        [
          {
          metadata: [],
        }
      ]
    },
  };
  */
  const fetchPoolsMetaBatch = async (key: string, p: any, refetch = false) => {
    if (!isReady || !api) {
      return;
    }
    if (!p.length) {
      return;
    }

    if (!refetch) {
      // if already exists, do not re-fetch
      if (poolMetaBatchesRef.current[key] !== undefined) {
        return;
      }
    } else {
      // tidy up if existing batch exists
      delete poolMetaBatches[key];
      delete poolMetaBatchesRef.current[key];

      if (poolSubsRef.current[key] !== undefined) {
        for (const unsub of poolSubsRef.current[key]) {
          unsub();
        }
      }
    }

    const ids = [];
    for (const _p of p) {
      ids.push(Number(_p.id));
    }

    // store batch ids
    const batchesUpdated = Object.assign(poolMetaBatchesRef.current);
    batchesUpdated[key] = {};
    batchesUpdated[key].ids = ids;
    setStateWithRef(
      { ...batchesUpdated },
      setPoolMetaBatch,
      poolMetaBatchesRef
    );

    const subscribeToMetadata = async (id: any) => {
      const unsub = await api.query.nominationPools.metadata.multi(
        id,
        (_metadata: any) => {
          const metadata = [];
          for (let i = 0; i < _metadata.length; i++) {
            metadata.push(_metadata[i].toHuman());
          }
          const _batchesUpdated = Object.assign(poolMetaBatchesRef.current);
          _batchesUpdated[key].metadata = metadata;

          setStateWithRef(
            { ..._batchesUpdated },
            setPoolMetaBatch,
            poolMetaBatchesRef
          );
        }
      );
      return unsub;
    };

    // initiate subscriptions
    await Promise.all([subscribeToMetadata(ids)]).then((unsubs: any) => {
      addMetaBatchUnsubs(key, unsubs);
    });
  };

  /*
   * Helper function to add mataBatch unsubs by key.
   */
  const addMetaBatchUnsubs = (key: string, unsubs: any) => {
    const _unsubs = poolSubsRef.current;
    const _keyUnsubs = _unsubs[key] ?? [];

    _keyUnsubs.push(...unsubs);
    _unsubs[key] = _keyUnsubs;
    setStateWithRef(_unsubs, setPoolSubs, poolSubsRef);
  };

  /*
   * Get the status of nominations.
   * Possible statuses: waiting, inactive, active.
   */
  const getNominationsStatus = () => {
    if (!poolNominations) {
      return defaults.nominationStatus;
    }

    const nominations = poolNominations?.nominations?.targets || [];
    const statuses: any = {};
    for (const nomination of nominations) {
      const s = eraStakers.stakers.find((_n: any) => _n.address === nomination);

      if (s === undefined) {
        statuses[nomination] = 'waiting';
        continue;
      }
      const exists = (s.others ?? []).find(
        (_o: any) => _o.who === activeAccount
      );
      if (exists === undefined) {
        statuses[nomination] = 'inactive';
        continue;
      }
      statuses[nomination] = 'active';
    }
    return statuses;
  };

  return (
    <PoolsContext.Provider
      value={{
        fetchPoolsMetaBatch,
        isNominator,
        isOwner,
        isDepositor,
        isBonding,
        getPoolBondedAccount,
        getPoolBondOptions,
        getPoolUnlocking,
        setTargets,
        getNominationsStatus,
        membership: poolMembership.membership,
        activeBondedPool: activeBondedPool.pool,
        meta: poolMetaBatchesRef.current,
        bondedPools,
        targets,
        poolNominations: poolNominations.nominations,
      }}
    >
      {children}
    </PoolsContext.Provider>
  );
};
