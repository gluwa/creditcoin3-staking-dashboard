// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useState } from 'react';
import { useOverlay } from '@polkadot-cloud/react/hooks';
import {
  CheckIcon,
  CheckMask,
  CheckboxLabel,
  CheckboxText,
  CloseButton,
  HiddenCheckbox,
  Notice,
  NoticeTitle,
  StyledCheckbox,
  SubmitButton,
  Wrapper,
} from './Wrapper';

export const DomainChangeNotice = () => {
  const {
    setModalStatus,
    config: { options },
  } = useOverlay().modal;

  const { onDismiss } = options || {};

  const [doNotShowAgain, setDoNotShowAgain] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    const newValue = !doNotShowAgain;
    setDoNotShowAgain(newValue);

    if (newValue && onDismiss) {
      onDismiss();
      setModalStatus('closing');
    }
  };

  const handleClose = () => {
    setModalStatus('closing');
  };

  const handleAcknowledge = () => {
    setModalStatus('closing');
  };

  return (
    <Wrapper>
      <CloseButton type="button" onClick={handleClose} />

      <NoticeTitle>NOTICE: UPDATES TO CTC STAKING URLS</NoticeTitle>

      <Notice>
        <p>
          This is the updated dashboard URL for{' '}
          <strong>Native CTC Staking</strong>.
        </p>
        <p>
          Read about the announcement by{' '}
          <a
            href="https://creditcoin.org/blog/ctc-staking-url-update"
            target="_blank"
            rel="nofollow noopener noreferrer"
            title="Opens a new tab"
          >
            clicking here
          </a>
          .
        </p>
      </Notice>

      <CheckboxLabel htmlFor="domain-notice-checkbox">
        <HiddenCheckbox
          id="domain-notice-checkbox"
          checked={doNotShowAgain}
          onChange={handleCheckboxChange}
        />
        <StyledCheckbox checked={doNotShowAgain}>
          <CheckMask checked={doNotShowAgain} />
          <CheckIcon checked={doNotShowAgain} viewBox="0 0 13 9">
            <path d="M0.888897 3.96834L4.80371 7.88315L11.798 0.888869" />
          </CheckIcon>
        </StyledCheckbox>
        <CheckboxText>Do not show again</CheckboxText>
      </CheckboxLabel>

      <SubmitButton type="button" onClick={handleAcknowledge}>
        I acknowledge
      </SubmitButton>
    </Wrapper>
  );
};
