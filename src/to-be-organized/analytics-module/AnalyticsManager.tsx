import { useEffect, useMemo } from 'react';
import { AnalyticsBrowser } from '@segment/analytics-next';
import { useStore } from '@nanostores/react';
import analyticsStore, {
  dispatchAnalyticsEvent,
  emptyDispatchedEvents,
} from '@src/to-be-organized/analytics-module/stores/analytics';
import {setAnalyticsObject, triggerEventDispatch} from '@src/to-be-organized/analytics-module/events/events-mapper';
import { type IVisitPages } from '@src/to-be-organized/analytics-module/analytics-types';

type IAnalyticsManagerProps = {
  segmentKey: string;
};
const processPageLocation = (pageLocation: string): IVisitPages | 'error' => {
  if (pageLocation === '/' || pageLocation.includes('/home')) {
    return 'home';
  }
  if (pageLocation.includes('/profile')) {
    return 'profile';
  }
  if (pageLocation.includes('/roadmap')) {
    return 'roadmap';
  }
  if (pageLocation.includes('/explore')) {
    return 'explore';
  }
  console.warn('page location not found', pageLocation);
  return 'error';
};

const AnalyticsManager = ({ segmentKey }: IAnalyticsManagerProps) => {
  const { dispatchedEvents } = useStore(analyticsStore);

  const analytics = useMemo(() => {
    const analyticsObject = AnalyticsBrowser.load({
      writeKey: segmentKey,
    });
    return analyticsObject;
  }, []);

  useEffect(() => {
    if (segmentKey === undefined) {
      console.log('segment key is undefined');
    }
    const pageLocation = window.location.pathname;
    const page = processPageLocation(pageLocation);
    if (page === 'error') return;
    dispatchAnalyticsEvent('pageView', {
      page,
    });
  }, []);

  useEffect(() => {
    setAnalyticsObject(analytics);
  }, []);


  useEffect(() => {
    if (dispatchedEvents.length === 0) return;
    dispatchedEvents.forEach((event) => {
      triggerEventDispatch(analytics, event);
    });
    emptyDispatchedEvents();
  }, [dispatchedEvents]);
};

export default AnalyticsManager;
