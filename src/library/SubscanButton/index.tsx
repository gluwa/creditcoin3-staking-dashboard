// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePlugins } from 'contexts/Plugins';
import { useActiveAccounts } from 'contexts/ActiveAccounts';
import { useNetwork } from 'contexts/Network';
import { Wrapper } from './Wrapper';

export const SubscanButton = ({ validatorAddress = '' }) => {
  const { plugins } = usePlugins();
  const { activeAccount } = useActiveAccounts();
  const { networkData } = useNetwork();

  const isSubscanActive = activeAccount !== null && plugins.includes('subscan');
  const subscanTypeName = validatorAddress ? 'validator' : 'account';
  const address = validatorAddress || activeAccount;
  return (
    <>
      <Wrapper $active={isSubscanActive}>
        <FontAwesomeIcon icon={faProjectDiagram} transform="shrink-4" />
        {isSubscanActive ? (
          <a
            href={`${networkData.subscanUrl}/${subscanTypeName}/${address}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Subscan
          </a>
        ) : (
          <span>Subscan</span>
        )}
      </Wrapper>
    </>
  );
};
