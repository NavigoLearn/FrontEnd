import {
  IEventMapper,
  IEventPayload,
  IEventTypes,
} from '@src/to-be-organized/analytics-module/analytics-types';
import {
  dispatchEventAuthInteraction,
  dispatchEventPageView,
  dispatchEventRoadmapInteraction,
} from '@src/to-be-organized/analytics-module/events/events-dispatch';
import { AnalyticsBrowser } from '@segment/analytics-next';

export const EventMap: IEventMapper = {
  roadmapInteraction: dispatchEventRoadmapInteraction,
  authInteraction: dispatchEventAuthInteraction,
  pageView: dispatchEventPageView,
};

export function triggerEventDispatch(
  analytics: AnalyticsBrowser,
  event: IEventPayload<IEventTypes>
) {}
