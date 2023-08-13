import { atom } from 'nanostores';

const roadmapVisitData = atom({
  roadmapId: '',
  ownerId: '',
  visitorId: '',
  visitorIsOwner: false,
} as {
  roadmapId: string;
  ownerId: string;
  visitorId: string;
  visitorIsOwner: boolean;
});

export default roadmapVisitData;

export function setRoadmapId(roadmapId: string) {
  const original = roadmapVisitData.get();
  roadmapVisitData.set({ ...original, roadmapId });
}

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

  roadmapVisitData.set({
    ...original,
    visitorIsOwner,
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

export const setOwnerId = recalculateOwnerDecorator((ownerId: string) => {
  const original = roadmapVisitData.get();
  roadmapVisitData.set({ ...original, ownerId });
});

export const setVisitorId = recalculateOwnerDecorator((visitorId: string) => {
  const original = roadmapVisitData.get();
  roadmapVisitData.set({ ...original, visitorId });
});
