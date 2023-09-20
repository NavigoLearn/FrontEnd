import { useEffect } from 'react';
import { dispatchAnalyticsEvent } from '@src/to-be-organized/analytics-module/stores/analytics';

const PageViewCollection = ({ page }: { page: string }) => {
  useEffect(() => {
    dispatchAnalyticsEvent('pageView', {
      page,
    });
  }, []);
};

export default PageViewCollection;
