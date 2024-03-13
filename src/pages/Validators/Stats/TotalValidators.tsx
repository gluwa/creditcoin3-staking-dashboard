// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { greaterThanZero } from '@w3ux/utils';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { useStaking } from 'contexts/Staking';
import { Pie } from 'library/StatBoxList/Pie';

export const TotalValidatorsStat = () => {
  const { t } = useTranslation('pages');
  const { staking } = useStaking();
  const { totalValidators, maxValidatorsCount } = staking;

  // total validators as percent
  let totalValidatorsAsPercent = 0;
  if (greaterThanZero(maxValidatorsCount)) {
    totalValidatorsAsPercent = totalValidators
      .div(maxValidatorsCount.dividedBy(100))
      .toNumber();
  }

  const params = {
    label: t('validators.totalValidators'),
    stat: {
      value: totalValidators.toNumber(),
      total: maxValidatorsCount.toNumber(),
      unit: '',
    },
    graph: {
      value1: totalValidators.toNumber(),
      value2: maxValidatorsCount.minus(totalValidators).toNumber(),
    },
    tooltip: `${new BigNumber(totalValidatorsAsPercent)
      .decimalPlaces(2)
      .toFormat()}%`,
    helpKey: 'Validator',
  };
  return <Pie {...params} />;
};
