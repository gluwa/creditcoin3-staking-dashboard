// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { ButtonHelp } from 'kits/Buttons/ButtonHelp';
import { Odometer } from 'component/Odometer';
import { useHelp } from 'contexts/Help';
import BigNumber from 'bignumber.js';
import { StatBox } from './Item';
import type { NumberProps } from './types';

export const Number = ({
  label,
  value,
  unit,
  helpKey,
  decimals,
}: NumberProps) => {
  const help = helpKey !== undefined;
  const { openHelp } = useHelp();

  return (
    <StatBox>
      <div className="content chart">
        <div className="labels">
          <h3>
            <Odometer
              value={new BigNumber(value)
                .decimalPlaces(decimals || 0)
                .toFormat()}
            />
            {unit ? <>{unit}</> : null}
          </h3>
          <h4>
            {label}
            {help ? (
              <ButtonHelp marginLeft onClick={() => openHelp(helpKey)} />
            ) : null}
          </h4>
        </div>
      </div>
    </StatBox>
  );
};
