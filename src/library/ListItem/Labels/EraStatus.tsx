// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { planckToUnit } from '@polkadot-cloud/utils';
import { useTranslation } from 'react-i18next';
import { useStaking } from 'contexts/Staking';
import { useUi } from 'contexts/UI';
import { ValidatorStatusWrapper } from 'library/ListItem/Wrappers';
import { useNetwork } from 'contexts/Network';
import type { EraStatusProps } from '../types';
import BigNumber from 'bignumber.js';

export const EraStatus = ({ noMargin, status, totalStake }: EraStatusProps) => {
  const { t } = useTranslation('library');
  const { isSyncing } = useUi();
  const { erasStakersSyncing } = useStaking();
  const { unit, units } = useNetwork().networkData;

  // Fallback to `waiting` status if still syncing.
  const validatorStatus = isSyncing ? 'waiting' : status;

  return (
    <ValidatorStatusWrapper $status={validatorStatus} $noMargin={noMargin}>
      <h5>
        {isSyncing || erasStakersSyncing
          ? t('syncing')
          : status === 'waiting' && totalStake.comparedTo(BigNumber(0)) === 0
            ? t('waiting')
            : `${t('listItemActive')} / ${planckToUnit(totalStake, units)
                .integerValue()
                .toFormat()} ${unit}`}
      </h5>
    </ValidatorStatusWrapper>
  );
};
