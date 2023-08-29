import { atom } from 'nanostores';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import {
  getIsCreate,
  getRoadmapState,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';

const roadmapVisitData = atom({
  loaded: false,
  roadmapId: '',
  ownerId: '',
  visitorId: '',
  visitorIsOwner: false,
} as {
  loaded: boolean;
  roadmapId: string;
  ownerId: string;
  visitorId: string;
  visitorIsOwner: boolean;
});

export default roadmapVisitData;

function recalculateIsOwner() {
  const original = roadmapVisitData.get();
  let visitorIsOwner;

  if (
    original.ownerId !== '' &&
    original.ownerId &&
    original.ownerId === original.visitorId
  ) {
    visitorIsOwner = true;
  } else {
    visitorIsOwner = false;
  }

  if (getIsCreate()) {
    visitorIsOwner = true;
  }

  roadmapVisitData.set({
    ...original,
    visitorIsOwner,
  });
}

function recalculateIsLoaded() {
  const original = roadmapVisitData.get();
  const roadmapState = getRoadmapState();
  let loaded;

  if (
    original.roadmapId !== '' &&
    original.roadmapId &&
    original.ownerId !== '' &&
    original.ownerId &&
    original.visitorId !== '' &&
    original.visitorId
  ) {
    loaded = true;
  } else {
    loaded = false;
  }

  roadmapVisitData.set({
    ...original,
    loaded,
  });
}

export function validData() {
  const original = roadmapVisitData.get();
  return original.ownerId !== '';
}

function recalculateOwnerDecorator(func) {
  return (...args) => {
    func(...args);
    recalculateIsOwner();
  };
}

function recalculateLoadedDecorator(func) {
  return (...args) => {
    func(...args);
    recalculateIsLoaded();
  };
}

export const setOwnerId = recalculateLoadedDecorator(
  recalculateOwnerDecorator((ownerId: string) => {
    const original = roadmapVisitData.get();
    roadmapVisitData.set({ ...original, ownerId });
  })
);

export const setVisitorId = recalculateLoadedDecorator(
  recalculateOwnerDecorator((visitorId: string) => {
    const original = roadmapVisitData.get();
    roadmapVisitData.set({ ...original, visitorId });
  })
);

export const setRoadmapId = recalculateLoadedDecorator((roadmapId: string) => {
  const original = roadmapVisitData.get();
  roadmapVisitData.set({ ...original, roadmapId });
});

export function getRoadmapVisitData() {
  return roadmapVisitData.get();
}
