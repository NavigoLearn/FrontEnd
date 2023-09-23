import { atom } from 'nanostores';
import { getElementDiv } from '@store/roadmap-refactor/elements-editing/elements-gs';
import {
  dynamicEffectsMapperForeignObjectElements,
  storeNodeEffects,
} from '@store/roadmap-refactor/elements-editing/store-node-effects';

export type IEventsNames = 'reset-transform';
export type IEventsApplyType = 'before-render' | 'after-render';

export type IEvent = {
  eventName: IEventsNames;
  eventLayer: number;
  eventType: IEventsApplyType;
};

type IEventsFunction = (divElementRef: HTMLElement) => void;
export const applyResetTransform: IEventsFunction = (
  divElementRef: HTMLElement
) => {
  divElementRef.style.transform = 'translate(0px, 0px)';
};

const eventsFunctionalitiesMapper: Record<IEventsNames, IEventsFunction> = {
  'reset-transform': (divElementRef: HTMLElement) => {
    applyResetTransform(divElementRef);
  },
};

const eventsPropertiesMapper: Record<IEventsNames, IEvent> = {
  'reset-transform': {
    eventName: 'reset-transform',
    eventLayer: 0,
    eventType: 'before-render',
  },
};

export const storeNodeEvents = atom({} as Record<string, IEventsNames[]>);

export function addNodeEvent(nodeId: string, event: IEventsNames) {
  const newStore = storeNodeEvents.get();
  if (!newStore[nodeId]) newStore[nodeId] = [];
  newStore[nodeId].push(event);
  storeNodeEvents.set({ ...newStore });
}

export function setNodeEventsInitialEmpty(id: string) {
  const originalEvents = storeNodeEvents.get();
  if (originalEvents[id]) {
    return;
  }
  originalEvents[id] = [];
  storeNodeEvents.set({
    ...originalEvents,
  });
}

export function deleteNodeEvent(nodeId: string, event: IEventsNames) {
  const newStore = storeNodeEvents.get();
  if (!newStore[nodeId]) return;
  const index = newStore[nodeId].indexOf(event);
  if (index > -1) {
    newStore[nodeId].splice(index, 1);
  }
  storeNodeEvents.set({ ...newStore });
}

export function getSortedBeforeRenderEvents(nodeId: string) {
  const originalEvents = storeNodeEvents.get();

  const eventsArr = originalEvents[nodeId].map(
    (eventName) => eventsPropertiesMapper[eventName]
  );

  const sortedEventsArr = eventsArr.sort((a, b) => {
    return a.eventLayer - b.eventLayer;
  });

  const divElementRef = document.getElementById(`div${nodeId}`);

  return () => {
    sortedEventsArr.forEach((event) => {
      if (event.eventType === 'before-render') {
        eventsFunctionalitiesMapper[event.eventName](divElementRef);
        deleteNodeEvent(nodeId, event.eventName);
      }
    });
  };
}
