// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import {
  ButtonSubmit,
  ModalPadding,
  ModalSeparator,
} from '@polkadot-cloud/react';
import { useOverlay } from '@polkadot-cloud/react/hooks';
import { useTranslation } from 'react-i18next';
import { Title } from 'library/Modal/Title';

export const DomainChangeNotice = () => {
  const { t } = useTranslation('modals');
  const {
    setModalStatus,
    config: { options },
  } = useOverlay().modal;

  const { onDismiss } = options || {};

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
    setModalStatus('closing');
  };

  const handleClose = () => {
    setModalStatus('closing');
  };

  return (
    <>
      <Title
        title={t('domainChangeNotice', {
          defaultValue: 'Domain Change Notice',
        })}
      />
      <ModalPadding>
        <h3 style={{ marginBottom: '1rem' }}>
          {t('domainChangeTitle', {
            defaultValue: 'Important: Staking Domain Has Changed',
          })}
        </h3>
        <ModalSeparator />
        <p style={{ marginBottom: '1rem' }}>
          {t('domainChangeMessage1', {
            defaultValue:
              'The Creditcoin staking service domain has been updated. Please note the following changes:',
          })}
        </p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>
            <strong>staking.creditcoin.org</strong> now serves{' '}
            <strong>CC3 Staking</strong>
          </li>
          <li>
            <strong>cc-enterprise-staking.creditcoin.org</strong> serves{' '}
            <strong>CC2 Staking</strong>
          </li>
        </ul>
        <p style={{ marginBottom: '1.5rem' }}>
          {t('domainChangeMessage2', {
            defaultValue: 'Please update your bookmarks accordingly.',
          })}
        </p>
        <div
          style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}
        >
          <ButtonSubmit
            text={t('dontShowAgain', { defaultValue: "Don't show again" })}
            onClick={handleDismiss}
            marginRight
          />
          <ButtonSubmit
            text={t('close', { defaultValue: 'Close' })}
            onClick={handleClose}
          />
        </div>
      </ModalPadding>
    </>
  );
};
