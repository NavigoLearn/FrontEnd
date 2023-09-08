import { atom } from 'nanostores';
import { RoadmapTypeApi } from '@type/explore_old/card';
import { fetchGetMiniProfileDataById } from '@src/api-wrapper/user/user';
import {
  fetchPostTabAboutDescription,
  fetchPostTabAboutTitle,
} from '@src/api-wrapper/roadmap/deprecated/tab-data';
import {
  IColorThemes,
  IColorThemesOptions,
} from '@type/roadmap/node/colors-types';

export type IRoadmapAbout = {
  name: string;
  author: string;
  description: string;
};

const storeRoadmapAbout = atom({
  name: 'Untitled',
  author: '',
  description: 'No description',
} as IRoadmapAbout);

export default storeRoadmapAbout;

export async function setTabAboutFromApi(roadmap: RoadmapTypeApi) {
  const newTab = storeRoadmapAbout.get();
  newTab.name = roadmap.name;
  const miniProfile = await fetchGetMiniProfileDataById(roadmap.ownerId);
  newTab.author = miniProfile.name;
  newTab.description = roadmap.description;
  storeRoadmapAbout.set({
    ...newTab,
  });
}

export function setTabAboutName(name: string, roadmapId: string) {
  const newTab = storeRoadmapAbout.get();
  newTab.name = name;
  // also dispatches request to backend
  try {
    fetchPostTabAboutTitle(roadmapId, name);
  } catch (e) {
    throw new Error('Error updating title');
  }
  storeRoadmapAbout.set({
    ...newTab,
  });
}

export function setTabAboutDescription(description: string, roadmapId: string) {
  const newTab = storeRoadmapAbout.get();
  newTab.description = description;
  // also dispatches request to backend
  try {
    fetchPostTabAboutDescription(roadmapId, description);
  } catch (e) {
    throw new Error('Error updating description');
  }
  storeRoadmapAbout.set({
    ...newTab,
  });
}

export function setTabAboutNameNoRequest(name: string) {
  const newTab = storeRoadmapAbout.get();
  newTab.name = name;
  storeRoadmapAbout.set({
    ...newTab,
  });
}

export function setTabAboutDescriptionNoRequest(description: string) {
  const newTab = storeRoadmapAbout.get();
  newTab.description = description;
  storeRoadmapAbout.set({
    ...newTab,
  });
}

export function setTabAboutProp(
  field: string,
  value: string,
  roadmapId: string
) {
  const updaters = {
    name: setTabAboutName,
    description: setTabAboutDescription,
  };
  updaters[field](value, roadmapId);
}

export function setTabAboutPropNoRequest(
  field: string,
  value: string,
  roadmapId: string
) {
  const updaters = {
    name: setTabAboutNameNoRequest,
    description: setTabAboutDescriptionNoRequest,
  };
  updaters[field](value, roadmapId);
}
