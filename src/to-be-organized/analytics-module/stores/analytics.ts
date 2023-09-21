import { atom } from 'nanostores';
import {
  type IDataPayloads,
  type IEventPayload,
  type IEventTypes,
} from '@src/to-be-organized/analytics-module/analytics-types';

const analyticsStore = atom({
  dispatchedEvents: [] as IEventPayload<IEventTypes>[],
});

const eventBuilder = <T extends IEventTypes>(
  type: T,
  data: IDataPayloads[T]
): IEventPayload<T> => {
  return {
    type,
    data,
  };
};

export const dispatchAnalyticsEvent = <T extends IEventTypes>(
  type: T,
  data: IDataPayloads[T]
) => {
  // used for sending events for analytics
  // If you think this kind of tracking might be invasive in any way, please
  // tell us and we'll remove it.
  const original = analyticsStore.get();
  analyticsStore.set({
    ...original,
    dispatchedEvents: [...original.dispatchedEvents, eventBuilder(type, data)],
  });
};

export const emptyDispatchedEvents = () => {
  const original = analyticsStore.get();
  analyticsStore.set({
    ...original,
    dispatchedEvents: [],
  });
};

export const getDispatchedEvents = () => {
  return analyticsStore.get().dispatchedEvents;
};

export default analyticsStore;
