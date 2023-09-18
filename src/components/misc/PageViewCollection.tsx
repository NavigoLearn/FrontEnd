import { useEffect } from 'react';
import { dispatchAnalyticsEvent } from '@store/misc/analytics';

const PageViewCollection = ({ page }: { page: string }) => {
  useEffect(() => {
    dispatchAnalyticsEvent('pageView', {
      page,
    });
  }, []);
};

export default PageViewCollection;
