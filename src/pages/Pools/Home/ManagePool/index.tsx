// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { PageRow } from 'kits/Structure/PageRow';
import { ButtonHelp } from 'kits/Buttons/ButtonHelp';
import { ButtonPrimary } from 'kits/Buttons/ButtonPrimary';
import { useTranslation } from 'react-i18next';
import { useHelp } from 'contexts/Help';
import { useActivePools } from 'contexts/Pools/ActivePools';
import { useUi } from 'contexts/UI';
import { CardHeaderWrapper, CardWrapper } from 'library/Card/Wrappers';
import { Nominations } from 'library/Nominations';
import { useOverlay } from 'kits/Overlay/Provider';
import { useActiveAccounts } from 'contexts/ActiveAccounts';
import { useValidators } from 'contexts/Validators/ValidatorEntries';

export const ManagePool = () => {
  const { t } = useTranslation();
  const { isSyncing } = useUi();
  const { poolNominated } = useValidators();
  const { openCanvas } = useOverlay().canvas;
  const { activeAccount } = useActiveAccounts();
  const { isOwner, isNominator, poolNominations, selectedActivePool } =
    useActivePools();

  const isNominating = !!poolNominations?.targets?.length;
  const nominator = selectedActivePool?.addresses?.stash ?? null;
  const { state } = selectedActivePool?.bondedPool || {};
  const { openHelp } = useHelp();

  const canNominate = isOwner() || isNominator();

  return (
    <PageRow>
      <CardWrapper>
        {isSyncing ? (
          <Nominations bondFor="pool" nominator={activeAccount} />
        ) : canNominate && !isNominating && state !== 'Destroying' ? (
          <>
            <CardHeaderWrapper $withAction $withMargin>
              <h3>
                {t('nominate.nominations', { ns: 'pages' })}
                <ButtonHelp
                  marginLeft
                  onClick={() => openHelp('Nominations')}
                />
              </h3>
              <div>
                <ButtonPrimary
                  iconLeft={faChevronCircleRight}
                  iconTransform="grow-1"
                  text={t('pools.nominate', { ns: 'pages' })}
                  disabled={!canNominate}
                  onClick={() =>
                    openCanvas({
                      key: 'ManageNominations',
                      scroll: false,
                      options: {
                        bondFor: 'pool',
                        nominator,
                        nominated: poolNominated || [],
                      },
                      size: 'xl',
                    })
                  }
                />
              </div>
            </CardHeaderWrapper>
            <h4>{t('notNominating', { ns: 'library' })}.</h4>
          </>
        ) : (
          <Nominations bondFor="pool" nominator={nominator} />
        )}
      </CardWrapper>
    </PageRow>
  );
};
