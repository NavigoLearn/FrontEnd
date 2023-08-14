import { atom } from 'nanostores';
import { RoadmapTypeApi } from '@type/explore/card';
import { fetchGetMiniProfileDataById } from '../../../api-wrapper/user/user';
import {
  fetchPostTabAboutDescription,
  fetchPostTabAboutTitle,
} from '../../../api-wrapper/roadmap/tab-data';

const aboutTabStore = atom({
  name: '',
  author: '',
  description: '',
} as {
  name: string;
  author: string;
  description: string;
});

export default aboutTabStore;

export async function setTabAboutFromApi(roadmap: RoadmapTypeApi) {
  const newTab = aboutTabStore.get();
  newTab.name = roadmap.name;
  const miniProfile = await fetchGetMiniProfileDataById(roadmap.ownerId);
  newTab.author = miniProfile.name;
  newTab.description = roadmap.description;
  aboutTabStore.set({
    ...newTab,
  });
}

export function setTabAboutName(name: string, roadmapId: string) {
  const newTab = aboutTabStore.get();
  newTab.name = name;
  // also dispatches request to backend
  try {
    fetchPostTabAboutTitle(roadmapId, name);
  } catch (e) {
    throw new Error('Error updating title');
  }
  aboutTabStore.set({
    ...newTab,
  });
}

export function setTabAboutDescription(description: string, roadmapId: string) {
  const newTab = aboutTabStore.get();
  newTab.description = description;
  // also dispatches request to backend
  try {
    fetchPostTabAboutDescription(roadmapId, description);
  } catch (e) {
    throw new Error('Error updating description');
  }
  aboutTabStore.set({
    ...newTab,
  });
}

export function setTabAboutNameNoRequest(name: string) {
  const newTab = aboutTabStore.get();
  newTab.name = name;
  aboutTabStore.set({
    ...newTab,
  });
}

export function setTabAboutDescriptionNoRequest(description: string) {
  const newTab = aboutTabStore.get();
  newTab.description = description;
  aboutTabStore.set({
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
