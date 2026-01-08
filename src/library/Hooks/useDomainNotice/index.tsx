import { useEffect, useState } from 'react';

const STORAGE_KEY = 'domain_notice_dismissed';

export const useDomainNotice = () => {
  const [shouldShowNotice, setShouldShowNotice] = useState<boolean>(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);

    if (!dismissed) {
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
