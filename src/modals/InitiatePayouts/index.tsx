// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { ModalPadding } from '@polkadot-cloud/react';
import { Close } from 'library/Modal/Close';
import { useApi } from 'contexts/Api';
import { useSubmitExtrinsic } from 'library/Hooks/useSubmitExtrinsic';
import { SubmitTx } from 'library/SubmitTx';
import { useActiveAccounts } from 'contexts/ActiveAccounts';
import { useOverlay } from '@polkadot-cloud/react/hooks';
import { InputWrapper } from 'library/Form/Wrappers';
import { useActivePools } from 'contexts/Pools/ActivePools';
import { useState } from 'react';

export const InitiatePayout = () => {
  const { api } = useApi();
  const { activeAccount } = useActiveAccounts();
  const { setModalStatus } = useOverlay().modal;
  const { selectedActivePool } = useActivePools();
  const [eraIndex, setEraIndex] = useState<number>(0);
  const isValid = eraIndex > 0;

  const submitExtrinsic = useSubmitExtrinsic({
    tx: api?.tx.staking.payoutStakers(
      selectedActivePool?.addresses.stash,
      eraIndex
    ),
    from: activeAccount,
    shouldSubmit: true,
    callbackSubmit: () => {
      setModalStatus('closing');
    },
    callbackInBlock: () => {},
  });

  return (
    <>
      <Close />
      <ModalPadding>
        <h2 className="title unbounded">Initiate Payout to Pool</h2>
        <InputWrapper>
          <span className="inner">
            <section style={{ opacity: 1 }}>
              <div className="input">
                <h3>Era Index:</h3>
                <div>
                  <input
                    placeholder="Era Index"
                    value={eraIndex}
                    type="number"
                    onChange={(e) =>
                      e.target.valueAsNumber
                        ? setEraIndex(parseInt(e.target.value, 10))
                        : setEraIndex(0)
                    }
                  />
                </div>
              </div>
            </section>
          </span>
        </InputWrapper>
      </ModalPadding>
      <SubmitTx valid={isValid} {...submitExtrinsic} />
    </>
  );
};