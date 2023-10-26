import { atom } from 'nanostores';

type INavbarViewMode = 'owner' | 'collaborator' | 'viewer';

export const storeRoadmapNavbarState = atom({
  navbarViewMode: 'viewer',
} as {
  navbarViewMode: INavbarViewMode;
});

export function setNavbarViewMode(navbarViewMode: INavbarViewMode) {
  storeRoadmapNavbarState.set({
    navbarViewMode,
  });
}

export function toggleNavbarViewMode() {
  const { navbarViewMode } = storeRoadmapNavbarState.get();
  if (navbarViewMode === 'owner') {
    setNavbarViewMode('viewer');
  } else {
    setNavbarViewMode('owner');
  }
}
