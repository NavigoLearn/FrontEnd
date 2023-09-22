import { AnalyticsBrowser } from '@segment/analytics-next';
import {
  type IEventPayload,
  type IEventTypes,
  checkIsEventAuthInteraction,
  checkIsEventRoadmapInteraction,
  checkIsEventPageView,
} from '@src/to-be-organized/analytics-module/analytics-types';

export function dispatchEventRoadmapInteraction(
  analytics: AnalyticsBrowser,
  event: IEventPayload<IEventTypes>
) {
  if (checkIsEventRoadmapInteraction(event)) {
    // roadmap Interaction
    analytics.track(event.type, {
      actionType: event.data.actionType,
    });
  }
}

export function dispatchEventAuthInteraction(
  analytics: AnalyticsBrowser,
  event: IEventPayload<IEventTypes>
) {
  if (checkIsEventAuthInteraction(event)) {
    // type of profile interaction
    analytics.track(event.type, {
      actionType: event.data.actionType,
    });
  }
}

export function dispatchEventPageView(
  analytics: AnalyticsBrowser,
  event: IEventPayload<IEventTypes>
) {
  if (checkIsEventPageView(event)) {
    analytics.pageView(event.data.page);
  }
}
