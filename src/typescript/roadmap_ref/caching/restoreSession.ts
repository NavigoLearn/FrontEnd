import { hashData } from '@src/typescript/utils/hashData';
import {
  getRoadmapState,
  getRoadmapStateStore,
  IRoadmapStateStore,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';
import { getRoadmapEdit } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';
import { getRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { setRoadmapCreate } from '@store/roadmap-refactor/roadmap-data/roadmap-create';

export type SaveItem = {
  data: IRoadmap;
};

const id = 'create';

export async function saveSession() {
  const data = getRoadmapSelector() as IRoadmap;
  const saveItem: SaveItem = {
    data,
  };
  // convert to json
  const roadmapData = JSON.stringify(saveItem);
  // hash the json
  const hash = await hashData(roadmapData);
  const versionHistory = localStorage.getItem(`${id}-roadmapVersionHistory`);
  localStorage.setItem(`${id}-roadmapVersionHistory`, JSON.stringify([hash]));
  localStorage.setItem(hash, roadmapData);
}

export async function restoreSession() {
  const versionHistory = localStorage.getItem(`${id}-roadmapVersionHistory`);
  // if there is no version history, return
  if (versionHistory === null) {
    return null;
  }

  const parsedVersionHistory = JSON.parse(versionHistory);
  if (parsedVersionHistory.length === 0) {
    return null;
  }

  const lastHash = parsedVersionHistory[parsedVersionHistory.length - 1];
  const lastData = localStorage.getItem(lastHash);
  if (lastData === null) {
    return null;
    console.log('lastData is null !!!!');
  }

  const hash = await hashData(lastData);
  const roadmapData = JSON.parse(lastData).data;
  console.log('restoring session', roadmapData);
  setRoadmapCreate(roadmapData);
  return {
    done: true,
  };
}

export function clearSession() {
  const versionHistory = localStorage.getItem(`${id}-roadmapVersionHistory`);
  if (versionHistory === null) {
    return null;
  }
  const parsedVersionHistory = JSON.parse(versionHistory);
  parsedVersionHistory.forEach((hash: string) => {
    localStorage.removeItem(hash);
  });
  localStorage.removeItem(`${id}-roadmapVersionHistory`);
  return true;
}

export function checkIfSessionExists() {
  const versionHistory = localStorage.getItem(`${id}-roadmapVersionHistory`);
  if (versionHistory === null) {
    return false;
  }
  const parsedVersionHistory = JSON.parse(versionHistory);
  return parsedVersionHistory.length !== 0;
}
