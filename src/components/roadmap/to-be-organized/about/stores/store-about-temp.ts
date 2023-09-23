import { atom } from 'nanostores';
import roadmapAbout, {
  type IRoadmapAbout,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import { type IColorThemesOptions } from '@type/roadmap/node/colors-types';
import {
  getColorThemeFromRoadmap,
  setRoadmapColorTheme,
} from '@components/roadmap/pages-roadmap/setup-screen/theme-controler';
import { triggerAllNodesRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';

const storeAboutTemporary = atom({
  name: 'Untitled',
  ownerId: '',
  description: 'No description',
  theme: 'winterTheme',
} as IRoadmapAbout & { theme: IColorThemesOptions });

export default storeAboutTemporary;

export function setStoreAboutTempName(name: string) {
  const newTab = storeAboutTemporary.get();
  newTab.name = name;
  storeAboutTemporary.set({
    ...newTab,
  });
}

export function setStoreAboutTempDescription(description: string) {
  const newTab = storeAboutTemporary.get();
  newTab.description = description;
  storeAboutTemporary.set({
    ...newTab,
  });
}

export function setStoreAboutTempTheme(theme: IColorThemesOptions) {
  const newTempStore = storeAboutTemporary.get();
  newTempStore.theme = theme;
  storeAboutTemporary.set({
    ...newTempStore,
  });
}

export function pullStoreAboutTempFromApp() {
  const currentAbout = roadmapAbout.get();
  const theme = getColorThemeFromRoadmap();

  storeAboutTemporary.set({
    ...currentAbout,
    name: currentAbout.name,
    description: currentAbout.description,
    ownerId: currentAbout.ownerId,
    theme,
  });
}

export function pushStoreAboutTempChangesToApp() {
  const currentAbout = roadmapAbout.get();
  const tempAbout = storeAboutTemporary.get();

  currentAbout.name = tempAbout.name;
  currentAbout.description = tempAbout.description;
  currentAbout.ownerId = tempAbout.ownerId;
  roadmapAbout.set({
    ...currentAbout,
  });

  setRoadmapColorTheme(tempAbout.theme);
  triggerAllNodesRerender();
}

export function getStoreAboutTemp() {
  return storeAboutTemporary.get();
}
