// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'staking_domain_notice_dismissed';
const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000;

export const useDomainNotice = () => {
  const [shouldShowNotice, setShouldShowNotice] = useState<boolean>(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);

    if (!dismissed) {
      setShouldShowNotice(true);
      return;
    }

    try {
      const dismissedTimestamp = parseInt(dismissed, 10);
      const now = Date.now();

      if (now - dismissedTimestamp > SIX_MONTHS_MS) {
        localStorage.removeItem(STORAGE_KEY);
        setShouldShowNotice(true);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setShouldShowNotice(true);
    }
  }, []);

  const dismissNotice = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setShouldShowNotice(false);
  };

  return {
    shouldShowNotice,
    dismissNotice,
  };
};
