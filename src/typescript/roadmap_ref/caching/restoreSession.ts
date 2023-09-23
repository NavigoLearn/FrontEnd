import { type IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { getRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { setRoadmapCreate } from '@store/roadmap-refactor/roadmap-data/roadmap-create';
import { getRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';

export type SaveItem = {
  data: IRoadmap;
};

export async function saveSession() {
  const data = getRoadmapSelector() as IRoadmap;
  const saveItem: SaveItem = {
    data,
  };
  // convert to json
  const roadmapData = JSON.stringify(saveItem);

  // check if it fits in local storage
  if (roadmapData.length > 5000000) {
    // eslint-disable-next-line no-console
    console.log('Roadmap is too big to save in local storage');
    // eslint-disable-next-line no-console
    console.log('Roadmap size: ', roadmapData.length / 1000000, 'MB');
    return;
  }

  localStorage.setItem(`sessionSaved`, JSON.stringify(roadmapData));
  localStorage.setItem(`lastRoadmapEdited`, getRoadmapId());
}

export function restoreSession() {
  const versionHistory = localStorage.getItem(`sessionSaved`);
  const lastRoadmapEdited = localStorage.getItem(`lastRoadmapEdited`);
  const currentRoadmapId = getRoadmapId();
  // if there is no version history, return
  if (versionHistory === null) {
    return false;
  }

  if (lastRoadmapEdited !== currentRoadmapId) {
    return false;
  }

  const roadmapData = JSON.parse(versionHistory).data;
  setRoadmapCreate(roadmapData);

  return true;
}

export function clearSession() {
  const versionHistory = localStorage.getItem(`sessionSaved`);
  const lastRoadmapEdited = localStorage.getItem(`lastRoadmapEdited`);
  if (versionHistory === null || lastRoadmapEdited === null) {
    return false;
  }
  localStorage.removeItem(`sessionSaved`);
  localStorage.removeItem(`lastRoadmapEdited`);

  return true;
}

export function checkIfSessionExists() {
  const versionHistory = localStorage.getItem(`sessionSaved`);
  const lastRoadmapEdited = localStorage.getItem(`lastRoadmapEdited`);
  const currentRoadmapId = getRoadmapId();

  return versionHistory !== null && lastRoadmapEdited === currentRoadmapId;
}
