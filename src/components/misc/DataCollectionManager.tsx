import { useEffect, useMemo, useRef } from 'react';
import { AnalyticsBrowser } from '@segment/analytics-next';
import { useStore } from '@nanostores/react';
import analyticsStore, { emptyDispatchedEvents } from '@store/misc/analytics';
import { Event, EventMapper, EventType } from '@type/misc/analytics';
import {
  checkIsEventAuthInteraction,
  checkIsEventExploreInteraction,
  checkIsEventPageView,
  checkIsEventProfileInteraction,
  checkIsEventRoadmapInteraction,
} from '@type/misc/typecheckers';

const DataCollectionManager = () => {
  const disabled = useRef(false);

  const EventMap: EventMapper = {
    roadmapInteraction: (
      analytics: AnalyticsBrowser,
      event: Event<EventType>
    ) => {
      if (checkIsEventRoadmapInteraction(event)) {
        // roadmap Interaction
        analytics.track(event.type, {
          actionType: event.data.actionType,
        });
      }
    },
    exploreInteractionQuery: (
      analytics: AnalyticsBrowser,
      event: Event<EventType>
    ) => {
      if (checkIsEventExploreInteraction(event)) {
        // explore interaction message
        console.log('quer search', event.data.exploreData.query);
        analytics.track(event.type, {
          actionType: event.data.exploreActionType,
          query: event.data.exploreData.query,
        });
      }
    },
    profileInteraction: (
      analytics: AnalyticsBrowser,
      event: Event<EventType>
    ) => {
      if (checkIsEventProfileInteraction(event)) {
        // type of profile interaction
        analytics.track(event.type, {
          actionType: event.data.actionType,
        });
      }
    },
    authInteraction: (analytics: AnalyticsBrowser, event: Event<EventType>) => {
      if (checkIsEventAuthInteraction(event)) {
        // type of profile interaction
        analytics.track(event.type, {
          actionType: event.data.actionType,
        });
      }
    },
    pageView: (analytics: AnalyticsBrowser, event: Event<EventType>) => {
      if (checkIsEventPageView(event)) {
        analytics.pageView(event.data.page);
      }
    },
  };

  const triggerEvents = <T extends EventType>(
    event: Event<T>,
    analytics: AnalyticsBrowser
  ) => {
    const eventHandler = EventMap[event.type];
    if (eventHandler) {
      eventHandler(analytics, event);
    }
  };

  const { dispatchedEvents } = useStore(analyticsStore);

  const analytics = useMemo(() => {
    const analyticsObject = AnalyticsBrowser.load({
      writeKey: 'gqHz7gJIiPkOPu1BRGc6kIAT569vnSWc',
    });

    return analyticsObject;
  }, []);

  useEffect(() => {
    if (dispatchedEvents.length === 0) return;
    dispatchedEvents.forEach((event) => {
      // triggerEvents(event, analytics);
      // user has blocker or something
    });
    emptyDispatchedEvents();
  }, [dispatchedEvents]);
};

export default DataCollectionManager;
