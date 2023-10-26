import { atom } from 'nanostores';

export const storeRoadmapNavbarProperties = atom({
  under2Xl: false,
} as {
  under2Xl: boolean;
});

export function setUnder2Xl(under2Xl: boolean) {
  storeRoadmapNavbarProperties.set({
    under2Xl,
  });
}
