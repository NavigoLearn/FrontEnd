import {
  type IEventMapper,
  type IEventPayload,
  type IEventTypes,
} from '@src/to-be-organized/analytics-module/analytics-types';
import {
  dispatchEventAuthInteraction,
  dispatchEventPageView,
  dispatchEventRoadmapInteraction,
} from '@src/to-be-organized/analytics-module/events/events-dispatch';
import { AnalyticsBrowser } from '@segment/analytics-next';
import { getUserStatus } from '@store/user/user-status';
import { getProfileMini } from '@store/user/store-logged-user';

export const EventMap: IEventMapper = {
  roadmapInteraction: dispatchEventRoadmapInteraction,
  authInteraction: dispatchEventAuthInteraction,
  pageView: dispatchEventPageView,
};

type TriggerFunction<T extends any[]> = (...args: T) => any;

type IAnalyticsArgs = [AnalyticsBrowser, IEventPayload<IEventTypes>];
export function analyticsIdentificationDecorator(
  func: TriggerFunction<IAnalyticsArgs>
): TriggerFunction<IAnalyticsArgs> {
  return (analytics: AnalyticsBrowser, event: IEventPayload<IEventTypes>) => {
    const status = getUserStatus();
    if (status.isLogged) {
      const miniProfile = getProfileMini();
      const { name } = miniProfile;
      analytics.identify(status.userId, {
        id: status.userId,
        name,
      });
    }
    func(analytics, event);
  };
}

let analyticsObject = null;
export function setAnalyticsObject(analytics: AnalyticsBrowser) {
    analyticsObject = analytics;
}
export function identifyUser() {
  const status = getUserStatus();
  if (status.isLogged) {
    const miniProfile = getProfileMini();
    const { name } = miniProfile;
    analyticsObject.identify(status.userId, {
      id: status.userId,
      name,
    });
  }
}

export const triggerEventDispatch = (analytics: AnalyticsBrowser, event: IEventPayload<IEventTypes>) => {
    analytics.track(event.type, event.data);
  }
;
