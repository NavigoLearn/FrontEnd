import { useEffect, useMemo } from 'react';
import { AnalyticsBrowser } from '@segment/analytics-next';
import { useStore } from '@nanostores/react';
import analyticsStore, {
  emptyDispatchedEvents,
} from '@src/to-be-organized/analytics-module/stores/analytics';
import { triggerEventDispatch } from '@src/to-be-organized/analytics-module/events/events-mapper';

type IAnalyticsManagerProps = {
  segmentKey: string;
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
    if (dispatchedEvents.length === 0) return;
    dispatchedEvents.forEach((event) => {
      triggerEventDispatch(analytics, event);
    });
    emptyDispatchedEvents();
  }, [dispatchedEvents]);
};

export default AnalyticsManager;
