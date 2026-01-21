import { useEffect, useState } from 'react';

const STORAGE_KEY = 'domain_notice_dismissed';

export const useDomainNotice = () => {
  const [shouldShowNotice, setShouldShowNotice] = useState<boolean>(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const currentUrl = window.location.href.toLowerCase();
    const isCC3Staking = currentUrl.includes('cc3-staking');

    if (!dismissed && !isCC3Staking) {
      setShouldShowNotice(true);
    }
  }, []);

  const dismissNotice = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShouldShowNotice(false);
  };

  return {
    shouldShowNotice,
    dismissNotice,
  };
};
