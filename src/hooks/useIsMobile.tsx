import { useEffect, useState } from 'react';

export function checkIsMobile() {
  const userAgent =
    typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
  return Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    setIsMobile(checkIsMobile());
  }, []);

  return isMobile;
}
