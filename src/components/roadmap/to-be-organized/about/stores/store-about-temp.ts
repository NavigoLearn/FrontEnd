import { atom } from 'nanostores';
import roadmapAbout, {
  IRoadmapAbout,
} from '@store/roadmap-refactor/roadmap-data/roadmap-about';
import { IColorThemesOptions } from '@type/roadmap/node/colors-types';
import { getRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';

const storeAboutTemporary = atom({
  name: 'Untitled',
  author: '',
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

export function setStoreAboutTempAuthor(author: string) {
  const newTab = storeAboutTemporary.get();
  newTab.author = author;
  storeAboutTemporary.set({
    ...newTab,
  });
}

export function pullStoreAboutTempFromApp() {
  const currentAbout = roadmapAbout.get();
  const theme = getRoadmapSelector().data.colorTheme;

  storeAboutTemporary.set({
    name: currentAbout.name,
    description: currentAbout.description,
    author: currentAbout.author,
    theme,
  });
}
